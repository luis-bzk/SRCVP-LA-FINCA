import mongoose, { Schema } from 'mongoose';

const membershipSchema = new Schema(
  {
    id_plan: {
      type: Schema.Types.ObjectId,
      ref: 'Plan',
    },
    years: {
      type: Number,
      required: ['Years is required'],
    },
    finish_date: {
      type: Date,
      required: ['Finish Date is required'],
    },
    totalCost: {
      tye: Number,
      required: ['TotalCost is required'],
    },
    status: {
      type: String,
      enum: {
        values: ['ACTIVE', 'INACTIVE'],
        message: '{VALUE} no es un tipo permitido',
        default: 'INACTIVE',
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const MembershipModel = mongoose.model('Membership', membershipSchema);
