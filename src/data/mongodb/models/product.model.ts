import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    images: [
      {
        type: String,
      },
    ],
    tags: [
      {
        type: String,
        required: [true, 'Tags are required'],
      },
    ],
    base_price: {
      type: Number,
      required: [true, 'Base price is required'],
    },
    discount: {
      type: Number,
      default: 0,
    },
    iva_included: {
      type: Boolean,
      default: false,
    },
    total_price: {
      type: Number,
      required: [true, 'Total price is required'],
    },
    brand: {
      type: String,
    },
    active_ingredient: {
      type: String,
    },
    bar_code: {
      type: String,
    },
    provider: {
      type: String,
    },
    warranty: {
      type: Number,
      default: 0,
    },
    additional_details: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

productSchema.index({ name: 'text', tags: 'text', active_ingredient: 'text' });

export const ProductModel = mongoose.model('Product', productSchema);
