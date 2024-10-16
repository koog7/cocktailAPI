import * as mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

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