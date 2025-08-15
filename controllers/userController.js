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

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
export const updateMe = async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /update-my-password to update your password.',
        400
      )
    );
  }

  const filterBody = filterObj(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
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
