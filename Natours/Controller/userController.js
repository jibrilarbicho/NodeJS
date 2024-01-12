const catchAsync = require('./../utils/catchAsync');
const User = require('./../Models/userModel');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const multer = require('multer');
const sharp = require('sharp');
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },
//   filename: function (req, file, cb) {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('not an image Please upload only image', 400), false);
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
exports.resizePhoto = (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users${req.file.filename}`);
  next();
};
exports.uploadUserPhoto = upload.single('photo');
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el]; //the same name with exact the same name and value
  });
  return newObj;
};
exports.getAllUsers = factory.getAll(User);

// exports.getAllUsers = catchAsync(async (req, res) => {
//   const users = await User.find();
//   res.status(500).json({
//     status: 'sucess',
//     data: {
//       users,
//     },
//   });
// });
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
exports.updateMe = catchAsync(async (req, res, next) => {
  console.log('files');
  console.log(req.file);
  console.log(req.body);
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }
  const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) {
    filteredBody.photo = req.file.filename;
  }
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  // 2) Update user document
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});
exports.getAllUser = factory.getOne(User);
// exports.getAllUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'this route is not defined',
//   });
// };
exports.createUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not defined',
  });
};
//Do not update Passwords with this
exports.updateUser = factory.updateOne(User);
// exports.updateUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'this route is not defined',
//   });
// };
exports.deleteUser = factory.deleteOne(User);

// exports.deleteUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'this route is not defined',
//   });
// };
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.post('/api/v1/tours', createTour);
