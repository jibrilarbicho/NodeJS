const express = require('express');
const tourController = require('./../Controller/tourController');
const tourRouter = express.Router();

tourRouter
  .route('/:id')
  .get(tourController.getTour)
  .post(tourController.createTour);
tourRouter
  .route('/')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);
module.exports = tourRouter;
