import mongoose, { Schema } from 'mongoose';

const roleSchema = new Schema(
  {
    name: {
      type: String,
      index: true,
      enum: {
        values: ['DEVELOPER', 'SUPER_ADMIN', 'ADMIN', 'PUBLIC', 'AFFILIATE'],
        message: '{VALUE} no es un tipo permitido',
        default: 'PUBLIC',
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const RoleModel = mongoose.model('Role', roleSchema);
