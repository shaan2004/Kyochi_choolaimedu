import { User } from './models/User';
import { connectToDatabase } from './db';

export async function seedAdminUser() {
  await connectToDatabase();
  
  try {
    const userCount = await User.countDocuments();
    
    if (userCount === 0) {
      const username = process.env.ADMIN_USERNAME || 'admin';
      const password = process.env.ADMIN_PASSWORD || 'admin123_kyochi';
      
      console.log(`[SEED] No users found in database. Seeding default admin: "${username}"`);
      
      await User.create({
        username,
        password, // Pre-save hook will hash this
        role: 'Admin',
      });
      
      console.log('[SEED] Admin user successfully seeded.');
    }
  } catch (error) {
    console.error('[SEED] Failed to seed admin user:', error);
  }
}
