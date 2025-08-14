import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
// eslint-disable-next-line import/order
import { promisify } from 'util';

import sendEmail from '../utils/email.js';

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

// eslint-disable-next-line import/prefer-default-export
export const signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    role: req.body.role,
  });
  createAndSendToken(newUser, 201, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // Check if email and password are provided in the request body
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }
  // Check if user and password are correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // If everything is OK, send the token to the client
  createAndSendToken(user, 200, res);
});

export const protectedRoutes = catchAsync(async (req, res, next) => {
  // 1) Get token from headers
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // 2) Check if token exists
  if (!token) {
    return next(new AppError('You are not logged in', 401));
  }

  // 3) Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 4) Check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) return next(new AppError('The user does not exist', 401));

  // 5) Check if user changed password after the token was issued
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        'Password updated recently. Please sign in again for security.',
        401
      )
    );
  }

  // Grant access to protected route
  req.user = freshUser;
  next();
});

export const restrictTO =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You are not authorized to perform this action', 403)
      );
    }
    next();
  };

export const forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user by email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('Invalid email address', 404));
  }
  // 2) Generate random token
  const resetToken = user.createPasswordReset();
  await user.save({ validateBeforeSave: false });
  // 3) Send it back as email
  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/reset-password/${resetToken}`;

  const message = `Forgot your password? Send a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't request a password reset, please ignore this email.`;
  console.log('Generated reset token:', resetToken);
  console.log('Reset URL:', resetURL);

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 minutes)',
      message,
    });
    console.log('Email sent successfully');

    res.status(200).json({
      status: 'success',
      message: 'Token sent to your email',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    console.error('Error sending email:', err);
    return next(new AppError('There was an error sending the email', 500));
  }
});

export const resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired and there is a user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Log the user in
  createAndSendToken(user, 200, res);
});

export const updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get the user from the collection
  const user = await User.findById(req.user.id).select('password');

  // 2) Check if posted current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong', 401));
  }

  // 3) If correct, update the password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // 4) Log the user in with the new password
  createAndSendToken(user, 200, res);
});
