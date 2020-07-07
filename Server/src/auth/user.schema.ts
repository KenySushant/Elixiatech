import { Schema } from 'mongoose';

export const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30,
    trim: true,
    unique: true,
    index: true,
  },
  passwordHash: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
    trim: true,
  },
  salt: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
    trim: true,
    unique: true,
    index: true,
  }
}, {
  timestamps: true,
  collection: 'User Master',
});
