import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    lastName: {
      type: String,
      required: [true, 'LastName is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    state: {
      type: String,
      enum: {
        values: ['CONFIRMED', 'NOT_CONFIRMED'],
        message: '{VALUE} no es un tipo permitido',
        default: 'NOT_CONFIRMED',
      },
      required: true,
    },
    token: {
      type: String,
    },
    id_role: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model('User', userSchema);
