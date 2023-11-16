const express = require('express');
const app = express();
const Errohndler = require('./Controller/controllerError');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(morgan('dev'));
``;
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
// app.all('*', (req, res, next) => {
//   res.status(404).json({
//     status: 'faill',
//     messsage: `can't find ${req.originalUrl}`,
//   });
// });
app.all('*', (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
});
//Error Handling Middleware (app.use((err, req, res, next) => { ... })):

app.use(Errohndler);
module.exports = app;
