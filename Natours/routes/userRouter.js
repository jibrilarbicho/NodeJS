const express = require('express');
const userController = require('./../Controller/userController');
const userRouter = express.Router();

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
