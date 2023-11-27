const Tour = require('../Models/tourModel');
const AppError = require('../utils/appError');
const APIFeatures = require('./../utils/ApiFeatures');
const catchAsync = require('./../utils/catchAsync');
const cathAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
exports.aliastoptours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage ,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getTours = factory.getAll(Tour);
// exports.getTours = catchAsync(async (req, res, next) => {
// const tours = await Tour.find({ duration: 5, difficulty: 'easy' });
// const tours = await Tour.find()
//   .where('duration')
//   .equals(5)
//   .where('difficulty')
//   .equals('easy');
// const queryObject = { ...req.query };
// const excludedFields = ['sort', 'limit', 'fields', 'page'];
// excludedFields.forEach((el) => delete queryObject[el]); //to delete from
// let queryStr = JSON.stringify(queryObject);
// console.log('Original:', queryStr);
// queryStr = queryStr.replace(/(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
// console.log(JSON.parse(queryStr));

// let query = Tour.find(JSON.parse(queryStr));
// if (req.query.sort) {
//   const sortBy = req.query.sort.split(',').join('');
//   query = query.sort(sortBy);

//   // query = query.sort(req.query.sort);
// } else {
//   query = query.sort(-'createdAt');
// }
// if (req.query.fields) {
//   const fields = req.query.fields.split(',').join('');
//   query = query.select(fields);
// } else {
//   query = query.select('-__v');
// }
// const page = req.query.page * 1 || 1;
// const limit = req.query.page * 1 || 100;
// const skip = (page - 1) * limit;
// query = query.skip(skip).limit(limit);
// if (req.query.page) {
//   const numTours = await Tour.countDocuments();
//   if (skip >= numTours) throw new Error('this does not exist');
// }
//   const features = new APIFeatures(Tour.find(), req.query)
//     .filter()
//     .sort()
//     .limiting()
//     .pagination();
//   const tours = await features.query;
//   // console.log(req.params);
//   const id = req.params.id * 1; //times is uesd to convert id to number
//   res.status(200).json({
//     status: 'sucess',
//     resluts: tours.length,
//     data: {
//       tours,
//     },
//   });
// });
exports.getTour = factory.getOne(Tour, { path: 'reviews' });
// exports.getTour = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findById(req.params.id).populate('reviews');
//   // const tour = await Tour.findById(req.params.id).populate({
//   //   path: 'guides',
//   //   select: '-__v -paswordChangedAt',
//   // });
//   // console.log(req.params);
//   const id = req.params.id * 1; //times is uesd to convert id to number
//   if (!tour) {
//     res.status(404).json({
//       status: 'fail',
//       message: 'no tour found with this ID',
//     });
//     return;
//   }
//   res.status(200).json({
//     status: 'sucess',
//     data: {
//       tour,
//     },
//   });

// if (id > tours.length) {
//   return res.status(404).json({
//     status: 'fail',
//     message: 'invalid ID',
//   });
// }
// const tour = tours.find((el) => el.id === id);
// res.status(200).json({
//   status: 'success',
//   data: {
//     tour,
//   },
// });
// });
exports.createTours = factory.createOne(Tour);
// exports.createTours = catchAsync(async (req, res, next) => {
//   const newTour = await Tour.create(req.body);

//   res.status(201).json({
//     status: 'sucess',
//     data: {
//       newTour,
//     },
//   });
// });
// const newID = tours[tours.length - 1].id + 1;
// const newTour = Object.assign({ id: newID }, req.body);
// tours.push(newTour);
// console.log(req.body);
// fs.writeFile(
//   `${__dirname}/dev-data/data/tours-simple.json`,
//   JSON.stringify(tours),
//   (err) => {
//     res.status(201).json({
//       status: 'success',
//       data: {
//         tour: newTour,
//       },
//     });
//   }
// );
// exports.updateTour = async (req, res) => {
//   try {
//     const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     res.status(200).json({
//       status: 'success',
//       data: {
//         tour,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: err,
//     });
//   }
// };
exports.updateTour = factory.updateOne(Tour);
// exports.updateTour = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });
//   if (!tour) {
//     return next(new AppError('No tour found with that ID', 404));
//   }
//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour,
//     },
//   });
// });
exports.deleteTour = factory.deleteOne(Tour);
// exports.deleteTour = catchAsync(async (req, res, next) => {
//   const deletedTour = await Tour.findByIdAndDelete(req.params.id);
//   if (!deletedTour) {
//     return next(new AppError('no tour with this Id', 404));
//   }
//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// });
exports.getTourstats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: '$difficulty',
        numTpurs: { $sum: 1 },
        numratings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: {
          $min: '$price',
        },
        maxPrice: {
          $max: '$price',
        },
      },
    },
    {
      $sort: { avgPrice: 1 }, //1 is for ascending
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});
exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-12`),
        },
      },
    },
    {
      $group: {
        _id: {
          $month: '$startDates',
        },
        numToursStart: { $sum: 1 },
        tours: {
          $push: '$name',
        },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: { _id: 0 },
    },
    {
      $sort: { numToursStart: 1 },
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      plan,
    },
  });
});
