const app = require('./app');
const port = 3000;

app.listen(port, () => {
  console.log(`App running on the port ${port}`);
});

// const mongoose = require('mongoose');

// const dotenv = require('dotenv');
// const app = require('.app');
// dotenv.config({ path: './config.env' });
// const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);
// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then((con) => {
//     console.log(con.connections);
//     console.log('DB connection succesfully');
//   });
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`app running on port ${port}...`);
// });
