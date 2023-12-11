import mongoose, { Schema } from 'mongoose';

const countrySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
    },
    code: {
      type: String,
      required: [true, 'Code is required'],
      unique: true,
    },
    prefix: {
      type: String,
      required: [true, 'Prefix  is required'],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CountryModel = mongoose.model('Country', countrySchema);
