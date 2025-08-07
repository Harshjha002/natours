import express from 'express';
import {
  getAllTours,
  createTour,
  getTourById,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPLan,
} from '../controllers/tourController.js';

import { protectedRoutes } from '../controllers/authController.js';

const router = express.Router();

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPLan);

router.route('/').get(protectedRoutes, getAllTours).post(createTour);

router.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

export default router;
