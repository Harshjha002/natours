import express from 'express';
import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  updateMe,
} from '../controllers/userController.js';
import {
  forgotPassword,
  login,
  protectedRoutes,
  resetPassword,
  signUp,
  updatePassword,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);

router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);

router.patch('/update-my-password', protectedRoutes, updatePassword);

router.patch('/update-me', protectedRoutes, updateMe);

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser);

export default router;
