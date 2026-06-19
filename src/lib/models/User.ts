import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    role: {
      type: String,
      enum: ['Admin', 'Author'],
      default: 'Author',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to hash passwords before storing
UserSchema.pre('save', async function (this: any) {
  if (!this.isModified('password')) {
    return;
  }

  // Increased salt rounds from 10 to 12 for stronger security against brute-force
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

// Instance method to compare password hash
UserSchema.methods.comparePassword = async function (passwordToCheck: string): Promise<boolean> {
  return bcrypt.compare(passwordToCheck, this.password);
};

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
