import express from 'express';
import { imagesUpload } from '../multer';
import User from '../models/Users';
import { randomUUID } from 'crypto';
import * as mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const authUserRouter = express.Router();
authUserRouter.use(express.json());

authUserRouter.post('/' , imagesUpload.single('avatar') , async (req, res, next )=>{
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).send({ message: 'Username already taken' });
    }
    console.log(req.body);
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
      return res.status(400).send(e)
    }
    return next(e)
  }
});


authUserRouter.post('/sessions' , async (req, res, next) => {
  try {
    const user = await User.findOne({email: req.body.email})

    if(!user){
      return res.status(400).send({error:'User or password are wrong'})
    }

    const comparePswrd = await bcrypt.compare(req.body.password , user.password)

    if(!comparePswrd){
      return res.status(400).send({error:'User or password are wrong'})
    }

    user.token = randomUUID();

    await user.save()
    res.send(user)
  }catch (e) {
    next(e)
  }
})

authUserRouter.delete('/sessions', async (req, res, next) => {
  try {
    const getToken = req.get('Authorization');
    const success = {message: 'Success'};

    if (!getToken) return res.send(success);

    const [_Bearer , token] = getToken.split(' ');

    const user = await User.findOne({token});

    if (!user) return res.send(success);

    user.token = randomUUID();
    user.save();

    return res.send(success);
  } catch (e) {
    return next(e);
  }
});

export default authUserRouter;