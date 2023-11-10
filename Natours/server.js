const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log(con.connections);
    console.log('DB connection successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// const TestTour = new Tour({
//   name: 'The Neak Hiker',
//   // rating: 4.7,
//   price: 997,
// });
// TestTour.save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('Error❤️‍🩹', err);
//   });
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
