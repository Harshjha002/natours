import qs from 'qs';
import Tour from '../models/tourModel.js';

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
    const queryObj = qs.parse(req._parsedUrl.query);
    const excludedFields = ['page', 'sort', 'limits', 'fields'];

    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Tour.find(JSON.parse(queryStr));

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      console.log(sortBy);
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    const tours = await query;

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
