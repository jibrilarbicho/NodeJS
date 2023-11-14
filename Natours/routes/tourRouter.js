const express = require('express');
const tourController = require('./../Controller/tourController');
const tourRouter = express.Router();
tourRouter.route('/tour-stats').get(tourController.getTourstats);
tourRouter
  .route('/top-5-cheap')
  .get(tourController.aliastoptours, tourController.getTours);
tourRouter
  .route('/:id')
  .get(tourController.getTour)
  .post(tourController.createTours)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

tourRouter
  .route('/')
  .get(tourController.getTours)
  .post(tourController.createTours)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);
module.exports = tourRouter;
