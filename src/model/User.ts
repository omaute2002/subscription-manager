import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  age: number;
  verifyCode: string;
  verificationExpiry: Date;
  createdAt: Date;
  subscriptions: Schema.Types.ObjectId[];
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "enter valid email addreess",
    ],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    min: 6,
  },
  age: {
    type: Number,
    required: [true, "Age is Required"],
  },
  verifyCode:{
    type:String,
    required:[true,"VerifyCode is required"]
  },
  verificationExpiry:{
    type:Date,
    required:[true,"Verifcation expiry is required"]
  },
  createdAt:{
    type:Date,
    default:Date.now(),
  },
  subscriptions: [{ type: Schema.Types.ObjectId, ref: 'Subscription' }]
});


const UserModel = mongoose.model<User>('User',UserSchema );
export default UserModel;