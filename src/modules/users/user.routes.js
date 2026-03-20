const express= require('express');
const userRouter = express.Router();

const {getProfile, getallUsers, updateProfile, deleteProfile, searchUsers}= require('./user.controller');

userRouter.get('/profile/:_id', getProfile);
userRouter.get('/all', getallUsers);
userRouter.put('/profile/:_id', updateProfile);
userRouter.delete('/profile/:_id', deleteProfile);
userRouter.get('/search', searchUsers);

module.exports=userRouter;