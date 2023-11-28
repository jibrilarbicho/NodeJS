// review / rating / createdAt / ref to tour / ref to uer
const Tour = require('./tourModel');
const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty!'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour.'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    to0bject: { virtuals: true },
  }
);
//to make one user create only one review
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

// reviewSchema.statics.calcAverageRatings = async function (tourID) {
//   const stats = await this.aggregate([
//     {
//       $match: { tour: tourID },
//     },
//     {
//       $group: {
//         _id: '$tour',
//         nRating: { $sum: 1 },
//         avgRating: { $avg: '$rating' },
//       },
//     },
//   ]);
//   console.log(stats);
//   await Tour.findByIdAndUpdate(tourID, {
//     ratingsQuantity: stats[0].nRating,
//     ratingsAverage: stats[0].avgRating,
//   });
// };
reviewSchema.statics.calcAverageRatings = async function (tourID) {
  console.log('Received tourID:', tourID);

  const stats = await this.aggregate([
    {
      $match: { tour: tourID },
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats.length > 0) {
    // console.log(stats);
    await Tour.findByIdAndUpdate(tourID, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourID, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

reviewSchema.post('save', function () {
  // this points to current review
  this.constructor.calcAverageRatings(this.tour);
});
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});
// reviewSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'tour', //tour Field in document
//     select: 'name',
//   }).populate({
//     path: 'user',
//     select: 'name photo',
//   });
//   next();
// });

reviewSchema.pre(/^findOneAnd/, async function (next) {
  // console.log(this.getQuery);
  this._currentQuery = await this.model.findOne(this.getQuery()); // Store the document in _currentQuery
  // console.log(this._currentQuery);
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  if (this._currentQuery) {
    const { tour, constructor } = this._currentQuery;
    await constructor.calcAverageRatings(tour);
    // console.log(this._currentQuery);
  }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
// reviewSchema.pre(/^findOneAnd/);findbyIdAndUpdate and findByIdAndDelete

// findByIdAndUpdate
// findByIdAndDelete

// reviewSchema.pre(/^findOneAnd/, async function (next) {
//   this.r = await this.model.findOne(this.getQuery());
//   // this.r = await this.findOne();
//   console.log(this.r);
//   next();
// });
// reviewSchema.post(/^findOneAnd/, async function () {
//   // this.r = await this.findOne(); Does not work b/c the query alredy excuted

//   await this.r.constructor.calcAverageRatings(this.r.tour);
//   console.log(this);
// });
