const express = require('express');
const fs = require('fs');
const app = express();
const morgan = require('morgan');

app.use(express.json());
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
app.use(morgan('dev'));
const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1; //times is uesd to convert id to number
  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};
const createTour = (req, res) => {
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);
  tours.push(newTour);
  console.log(req.body);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};
const updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { tour: '<Updated Tour here>' },
  });
};
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.post('/api/v1/tours', createTour);
app.route('api/v1/tours/:id').get(getTour).post(createTour);
app.route('/api/v1/tours').patch(updateTour);
const port = 3000;
app.listen(port, () => {
  console.log(`App running on the port ${port}`);
});
