import User from '../models/userModel.js';
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
