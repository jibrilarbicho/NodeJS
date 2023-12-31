const express = require('express');
const app = express();
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const helmet = require('helmet');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const Errohndler = require('./Controller/controllerError');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');
const AppError = require('./utils/appError');
const reviewRoutes = require('./routes/reviewRoutes');
// app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'views'));
app.use(helmet());
if (process.env.NODE_ENV === 'developement') app.use(morgan('dev'));
``;
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

app.use(express.json());
//Data Sanitization against NoSQL query Injetion
app.use(mongoSanitize());
//dataSanitization against xss
app.use(xss());
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratingsQuantity',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRoutes);
// app.all('*', (req, res, next) => {
//   res.status(404).json({
//     status: 'faill',
//     messsage: `can't find ${req.originalUrl}`,
//   });
// });
app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
//Error Handling Middleware (app.use((err, req, res, next) => { ... })):

app.use(Errohndler);
module.exports = app;
