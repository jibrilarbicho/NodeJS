const express = require('express');
const tourController = require('./../Controller/tourController');
const authoController = require('./../Controller/authController');
// const reviewController = require('./../Controller/reviewController');
const reviewRoutes = require('./../routes/reviewRoutes');
const tourRouter = express.Router();
// POST /tour/234fad4/reviews
// GET /tour/234fad4/reviews
// GET /tour/234fad4/reviews/94887fda
// tourRouter
//   .route('/:tourID/reviews')
//   .post(
//     authoController.protect,
//     authoController.restrictTo('user'),
//     reviewController.createReview
//   );

tourRouter.use('/:tourID/reviews', reviewRoutes);
tourRouter.route('/tour-stats').get(tourController.getTourstats);
tourRouter
  .route('/monthly-plan/:year')
  .get(
    authoController.protect,
    authoController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan
  );

tourRouter
  .route('/top-5-cheap')
  .get(tourController.aliastoptours, tourController.getTours);
tourRouter
  .route('/:id')
  .get(tourController.getTour)
  .post(tourController.createTours)
  .patch(tourController.updateTour)
  .delete(
    authoController.protect,
    authoController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );
tourRouter
  .route('/')
  .get(tourController.getTours)
  .post(
    authoController.protect,
    authoController.restrictTo('admin', 'lead-guide'),
    tourController.createTours
  )
  .patch(
    authoController.protect,
    authoController.restrictTo('admin', 'lead-guide'),
    tourController.updateTour
  );

module.exports = tourRouter;
