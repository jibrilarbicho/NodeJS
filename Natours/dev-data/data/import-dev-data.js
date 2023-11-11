const mongoose = require('mongoose');
const fs = require('fs');

const Tour = require('./../../Models/tourModel');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log(con.connections);
    console.log('DB connection successfully');
  });
const tours = JSON.parse(fs.readFileSync('tours-simple.json', 'utf-8'));
const ImportData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data Sucessfully loaded');
  } catch (err) {}
};
