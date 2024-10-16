import express from 'express';
import { imagesUpload } from '../multer';
import User from '../models/Users';
import { randomUUID } from 'crypto';
import * as mongoose from 'mongoose';

const authUserRouter = express.Router();
authUserRouter.use(express.json());

authUserRouter.post( '/' , imagesUpload.single('avatar') , async (req, res, next )=>{
  try {

    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      res.status(400).send({ message: 'Username already taken' });
    }

    const user = new User({
      email: req.body.email,
      displayName: req.body.displayName,
      password: req.body.password,
      avatar: req.file?.filename,
      token: randomUUID(),
    })

    await user.save()
    res.send(user)
  }catch (e) {
    if(e instanceof mongoose.Error.ValidationError){
      res.status(400).send(e)
    }
    return next(e)
  }
});

export default authUserRouter;