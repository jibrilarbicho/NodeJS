const express = require('express');
const reviewController = require('./../Controller/reviewController');
const reviewRoutes = express.Router({ mergeParams: true }); //to make access/TourID/reviews
const authocontroller = require('./../Controller/authController');
reviewRoutes.use(authocontroller.protect);
reviewRoutes.route('/').get(reviewController.getAllReviews).post(
  // authocontroller.protect,
  authocontroller.restrictTo('user'),
  reviewController.setTourUserIds,
  reviewController.createReview
);
reviewRoutes
  .route('/:id')
  .delete(
    authocontroller.restrictTo('admin', 'user'),
    reviewController.deleteReview
  )
  .patch(
    authocontroller.restrictTo('admin', 'user'),
    reviewController.updateReview
  )
  .get(reviewController.getReview);

module.exports = reviewRoutes;
