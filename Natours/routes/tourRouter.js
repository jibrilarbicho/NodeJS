const express = require('express');
const tourController = require('./../Controller/tourController');
const authoController = require('./../Controller/authController');
const tourRouter = express.Router();
tourRouter.route('/tour-stats').get(tourController.getTourstats);
tourRouter.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

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
  .get(authoController.protect, tourController.getTours)
  .post(tourController.createTours)
  .patch(tourController.updateTour);

module.exports = tourRouter;
