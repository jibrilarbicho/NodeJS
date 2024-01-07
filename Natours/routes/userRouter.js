const express = require('express');
const authController = require('./../Controller/authController');
const userController = require('./../Controller/userController');
const userRouter = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/img/users' });
userRouter.post('/signup', authController.signup);
userRouter.post('/login', authController.login);
userRouter.post('/forgotpassword', authController.forgotPassword);

userRouter.patch('/resetpassword/:token', authController.resetPassword);
userRouter.use(authController.protect);
//Next Middlewares are protected
userRouter.patch(
  '/updateMyPassword',
  // authController.protect,
  authController.updatePassword
);
userRouter.get(
  '/me',
  // authController.protect,
  userController.getMe,
  userController.getAllUser
);
userRouter.delete(
  '/deleteMe',
  //  authController.protect,
  userController.deleteMe
);
userRouter.patch(
  '/updateMe',
  upload.single('photo'),
  // authController.protect,
  userController.updateMe
);
userRouter.use(authController.restrictTo('admin'));
userRouter
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUsers);
userRouter
  .route('/:id')
  .get(userController.getAllUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRouter;
