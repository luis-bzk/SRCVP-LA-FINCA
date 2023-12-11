import mongoose, { Schema } from 'mongoose';

const addressSchema = new Schema(
  {
    id_city: {
      type: Schema.Types.ObjectId,
      ref: 'City',
    },
    id_province: {
      type: Schema.Types.ObjectId,
      ref: 'Province',
    },
    id_country: {
      type: Schema.Types.ObjectId,
      ref: 'Country',
    },
    main_street: {
      type: String,
      required: [true, 'Main street is required'],
    },
    secondary_street: {
      type: String,
    },
    postal_code: {
      type: String,
    },
  },
  { timestamps: true }
);

export const AddressModel = mongoose.model('Address', addressSchema);
