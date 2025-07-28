import Tour from '../models/tourModel.js';
import APIFeatures from '../utils/apiFeatures.js';

export const aliasTopTours = (req, res, next) => {
  // eslint-disable-next-line node/no-unsupported-features/node-builtins
  const query = new URLSearchParams(req.query);
  query.set('limit', '5');
  query.set('sort', 'price,-ratingsAverage');
  query.set('fields', 'name,price,ratingsAverage,summary,difficulty');

  req.url = `${req.path}?${query.toString()}`;

  next();
};

export const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'No tour found with given ID',
    });
  }
};
export const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'created',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'invalid data set',
    });
  }
};
export const getAllTours = async (req, res) => {
  try {
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const tours = await features.query;

    res.status(200).json({
      status: 'success',
      result: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Something went wrong',
    });
  }
};
export const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'Updated',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Something went wrong',
    });
  }
};
export const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id, req.body);
    res.status(204).json({
      status: 'Fail',
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Something went wrong',
    });
  }
};
