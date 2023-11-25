const express = require('express');
const reviewController = require('./../Controller/reviewController');
const reviewRoutes = express.Router();
const authocontroller = require('./../Controller/authController');
reviewRoutes
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authocontroller.protect,
    authocontroller.restrictTo('user'),
    reviewController.createReview
  );
module.exports = reviewRoutes;
