import Tour from '../models/tourModel.js';

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
export const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
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
