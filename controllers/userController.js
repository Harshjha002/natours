import User from '../models/userModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

export const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    result: users.length,
    data: {
      users,
    },
  });
});

export const updateMe = (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates please use /update-my-password too update passsword',
        400
      )
    );
  }

  res.status(200).json({
    status: 'success',
  });
};

export const createUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This Route is not yet defined' });
};
export const getUserById = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This Route is not yet defined' });
};
export const updateUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This Route is not yet defined' });
};
export const deleteUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This Route is not yet defined' });
};
