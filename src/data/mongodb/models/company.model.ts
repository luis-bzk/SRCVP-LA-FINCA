import mongoose, { Schema } from 'mongoose';

const companySchema = new Schema(
  {
    name: { type: String, required: [true, 'Name is required'] },
    social_reason: { type: String, required: [true, 'Social reason is required'] },
    email: { type: String, required: [true, 'Email is required'] },
    RUC: { type: String, required: [true, 'RUC is required'] },
    phone: { type: String },
    cellphone: { type: String, required: [true, 'Cellphone is required'] },
    domain: { type: String, required: [true, 'Domain is required'] },
    schedule: { type: String, required: [true, 'Schedule is required'] },
    id_address: { type: Schema.Types.ObjectId, ref: 'Address' },
    id_user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export const CompanyModel = mongoose.model('Company', companySchema);
