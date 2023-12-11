import mongoose, { Schema } from 'mongoose';

const publicDataSchema = new Schema(
  {
    identification: {
      type: String,
      required: [true, ' Identification is required.'],
      unique: true,
    },
    primary_phone: {
      type: String,
      required: [true, ' Cellphone is required.'],
    },
    secondary_phone: {
      type: String,
    },
    id_user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    id_address: {
      type: Schema.Types.ObjectId,
      ref: 'Address',
    },
  },
  {
    timestamps: true,
  }
);

export const PublicUserDataModel = mongoose.model('PublicUserData', publicDataSchema, 'publicUsersDatas');
