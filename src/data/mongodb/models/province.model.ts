import mongoose, { Schema } from 'mongoose';

const provinceSchema = new Schema(
  {
    name: {
      type: String,
      index: true,
      required: true,
      unique: true,
    },
    id_country: {
      type: Schema.Types.ObjectId,
      ref: 'Country',
    },
  },
  {
    timestamps: true,
  }
);

export const ProvinceModel = mongoose.model('Province', provinceSchema);
