const express = require('express');
const authController = require('./../Controller/authController');
const userController = require('./../Controller/userController');
const userRouter = express.Router();
userRouter.post('/signup', authController.signup);
userRouter.post('/login', authController.login);
userRouter.post('/forgotpassword', authController.forgotPassword);

userRouter.patch('/resetpassword/:token', authController.resetPassword);
userRouter.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);
userRouter.get(
  '/me',
  authController.protect,
  userController.getMe,
  userController.getAllUser
);
userRouter.delete('/deleteMe', authController.protect, userController.deleteMe);
userRouter.patch('/updateMe', authController.protect, userController.updateMe);
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
