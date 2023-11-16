const express = require('express');
const app = express();
const morgan = require('morgan');
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(morgan('dev'));
``;
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'faill',
    messsage: `can't find ${req.originalUrl}`,
  });
});
module.exports = app;
