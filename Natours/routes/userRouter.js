const express = require('express');
const authController = require('./../Controller/authController');

const userController = require('./../Controller/userController');
const userRouter = express.Router();
userRouter.post('/signup', authController.signup);
userRouter.post('/login', authController.login);
userRouter.post('/forgotpassword', authController.forgotPassword);
userRouter.post('/resetpassword', authController.resetPassword);

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
