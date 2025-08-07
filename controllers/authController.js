import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
// eslint-disable-next-line import/order
import { promisify } from 'util';

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

// eslint-disable-next-line import/prefer-default-export
export const signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  newUser.password = undefined;

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // Check if email and password are provided in the request body
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }
  //check if user and password are corect
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect Email or passwors', 401));
  }

  //if everything ok sent the token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
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
  console.log(decoded);

  //check if user still exist

  //check if user changed password after the token issue

  next();
});
