import mongoose from 'mongoose';
import { env } from './src/config/env';
import { User } from './src/features/auth/auth.model';
import { getAllLeads } from './src/features/leads/lead.service';

const run = async () => {
  await mongoose.connect(env.MONGODB_URI);
  const john = await User.findOne({ email: 'john@gmail.com' });
  console.log('JOHN USER:', john!.id, john!.role);
  
  const result = await getAllLeads({}, john);
  console.log('JOHN LEADS:', result.leads.map(l => l.name));

  const admin = await User.findOne({ email: 'admin@demo.com' });
  console.log('ADMIN USER:', admin!.id, admin!.role);

  const adminResult = await getAllLeads({}, admin);
  console.log('ADMIN LEADS:', adminResult.leads.map(l => l.name));

  process.exit(0);
};

run();
