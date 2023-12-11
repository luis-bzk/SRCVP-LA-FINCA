import mongoose, { Schema } from 'mongoose';

const categorySchema = new Schema(
  {
    name: { type: String, required: [true, 'Name is required'] },
    description: { type: String, required: [true, 'DEscription is required'] },
  },
  {
    timestamps: true,
  }
);

export const CategoryModel = mongoose.model('Category', categorySchema);
