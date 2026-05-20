import mongoose from 'mongoose';
import { User } from '../features/auth/auth.model';
import { UserRole } from '../features/auth/auth.types';
import { env } from '../config/env';

const seedAdmin = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const adminEmail = 'admin@demo.com';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log('Admin user already exists');
    } else {
      await User.create({
        name: 'Admin',
        email: adminEmail,
        password: 'password123',
        role: UserRole.ADMIN,
      });
      console.log('Admin user created successfully');
    }
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
};

seedAdmin();
