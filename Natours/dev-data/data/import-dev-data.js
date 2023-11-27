const mongoose = require('mongoose');
const fs = require('fs');

const Tour = require('./../../Models/tourModel');
const User = require('./../../Models/userModel');

const Review = require('./../../Models/reviewModel');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log(con.connections);
    console.log('DB connection successfully');
  });
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

const ImportData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);

    console.log('Data Sucessfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
//delete data from DB
const deleteD = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();

    console.log('Data Sucessfully Deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
if (process.argv[2] === '--import') {
  ImportData();
} else if (process.argv[2] === '--delete') {
  deleteD();
}
console.log(process.argv);
