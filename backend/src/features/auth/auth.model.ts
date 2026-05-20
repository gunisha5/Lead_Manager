import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserRole } from './auth.types';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { 
      type: String, 
      enum: Object.values(UserRole), 
      default: UserRole.SALES 
    },
  },
  { timestamps: true }
);

UserSchema.pre<IUser>('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt);
});

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password as string);
};

export const User = mongoose.model<IUser>('User', UserSchema);
