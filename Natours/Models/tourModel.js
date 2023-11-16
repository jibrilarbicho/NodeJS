const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: false,
      trim: true,
      maxlength: [40, 'Tour must have max length 40  char'],
      minlength: [10, 'Tour must have min length 10 char'],
      // validate: [validator.isAlpha, 'Tour name must only have character'],
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a max group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult',
      },
    },

    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'A Tour must have 1 min ratingAverage'],
      max: [5, 'A tour must have max 5 ratingAverage'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summary'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have an image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Document middleware: runs before .save() and .create()

//Document middleware:runs before .save().create()
tourSchema.pre('save', function (next) {
  //this intrdouces the current document
  this.slugify = slugify(this.name, { lower: true });
  next();
});

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7; //this represents each document
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
//query middleware
tourSchema.pre('find', function (next) {
  next();
});
