const Review = require('./../Models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourID) filter = { tour: req.params.tourID };
  const reviews = await Review.find(filter);

  // const reviews = await Review.find();
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});
exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourID;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
exports.createReview = factory.createOne(Review);
// exports.createReview = catchAsync(async (req, res, next) => {
//   if (!req.body.tour) req.body.tour = req.params.tourID;
//   if (!req.body.user) req.body.user = req.user.id;
//   const newReview = await Review.create(req.body);
//   res.status(200).json({
//     status: 'success',
//     data: {
//       review: newReview,
//     },
//   });
// });
exports.deleteReview = factory.deleteOne(Review);
exports.updateReview = factory.updateOne(Review);
