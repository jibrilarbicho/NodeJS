const User = require('./../Models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const { verify } = require('crypto');
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    // expiresIn: process.env.JWT_EXPIRES_IN,
    expiresIn: 7776000,
  });
};
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  // 3) If everything ok, send token to client
  const user = await User.findOne({ email }).select('+password');
  const token = signToken(user._id);

  const correct = await user.correctPassword(password, user.password);
  if (!user || !correct) {
    return next(new AppError('Incorrect email or password', 401));
  }
  res.status(200).json({
    status: 'success',
    token,
    user: {
      user,
    },
  });
});
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // console.log(token);
  if (!token) {
    return next(
      new AppError('You are not logged in plese login to get  accesss', 401)
    );
  }
  //Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // console.log(decoded);
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError('The user belonging to this token no longer exist ', 401)
    );
  }
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        'the user recently changed the password please login again ',
        401
      )
    );
  }
  req.user = freshUser;
  next();
});
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    console.log('role', req.user.role);
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};
