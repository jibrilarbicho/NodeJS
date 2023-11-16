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
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log(con.connections);
    console.log('DB connection successfully');
  });
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);
const ImportData = async () => {
  try {
    await Tour.create(tours);
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
