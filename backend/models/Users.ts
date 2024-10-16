import * as mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

export interface IUser {
  _id: string;
  email: string;
  displayName: string;
  avatar: string;
  password: string;
  role: 'user' | 'admin';
  token: string;
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  displayName:{
    type: String,
    required: true,
    unique: true,
  },
  avatar:{
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true,
  },
  role:{
    type:String,
    required: true,
    default:'user',
    enum:['user', 'admin'],
  },
  token: {
    type: String,
    required: true,
  }
})

UserSchema.pre('save' , async function (next){
  if(!this.isModified('password')){
    return next();
  }

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
  this.password = await bcrypt.hash(this.password , salt)

  next()
})

UserSchema.set('toJSON', {
  transform: (_doc , ret) =>{
    delete ret.password;
    return ret;
  }
})

const User = mongoose.model('User' , UserSchema);
export default User;