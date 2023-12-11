import mongoose, { Schema } from 'mongoose';

const citySchema = new Schema(
  {
    name: {
      type: String,
      requires: [true, 'Name is required'],
      unique: true,
    },
    id_province: {
      type: Schema.Types.ObjectId,
      ref: 'Province',
    },
  },
  {
    timestamps: true,
  }
);

export const CityModel = mongoose.model('City', citySchema);
