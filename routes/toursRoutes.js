import express from 'express';
import {
  getAllTours,
  createTour,
  getTourById,
  updateTour,
  deleteTour,
  checkId,
  checkbody,
} from '../controllers/tourController.js';

const router = express.Router();

router.param('id', checkId);

router.route('/').get(getAllTours).post(checkbody, createTour);

router.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

export default router;
