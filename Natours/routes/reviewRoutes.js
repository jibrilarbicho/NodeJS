const express = require('express');
const reviewController = require('./../Controller/reviewController');
const reviewRoutes = express.Router({ mergeParams: true }); //to make access/TourID/reviews
const authocontroller = require('./../Controller/authController');
reviewRoutes
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authocontroller.protect,
    authocontroller.restrictTo('user'),
    reviewController.createReview
  );
reviewRoutes.route('/:id').delete(reviewController.deleteReview);
module.exports = reviewRoutes;
