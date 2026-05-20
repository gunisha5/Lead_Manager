import mongoose from 'mongoose';
import { env } from './src/config/env';
import { User } from './src/features/auth/auth.model';
import { Lead } from './src/features/leads/lead.model';

const run = async () => {
  await mongoose.connect(env.MONGODB_URI);
  const users = await User.find().lean();
  console.log('USERS:', JSON.stringify(users, null, 2));

  const leads = await Lead.find().lean();
  console.log('LEADS:', JSON.stringify(leads, null, 2));
  
  process.exit(0);
};

run();
