import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

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

const User = mongoose.model('User' , UserSchema);
export default User;