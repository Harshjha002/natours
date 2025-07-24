import express from 'express';
import {
  getAllTours,
  createTour,
  getTourById,
  updateTour,
  deleteTour,
} from '../controllers/tourController.js';
const router = express.Router();

router.route('/').get(getAllTours).post(createTour);

router.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

export default router;
