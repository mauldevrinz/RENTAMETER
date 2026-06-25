import fs from 'fs';
import path from 'path';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

const usersFilePath = path.join(process.cwd(), 'src', 'data', 'users.json');
const JWT_SECRET = process.env.JWT_SECRET || 'rentameter_super_secret_key_for_dev_only';

// Create a Google Auth Client
// We use the same client ID used on the frontend
const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'placeholder-client-id.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { credential } = req.body;

  if (!credential) {
    return res.status(400).json({ message: 'Google credential is required' });
  }

  try {
    // 1. Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: CLIENT_ID, 
    });
    
    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    // 2. Read existing users from our database
    let users = [];
    if (fs.existsSync(usersFilePath)) {
      const usersData = fs.readFileSync(usersFilePath, 'utf8');
      if (usersData) {
        users = JSON.parse(usersData);
      }
    }

    // 3. Find or Create User
    let user = users.find((u) => u.email === email);
    
    if (!user) {
      // Create new user if they don't exist
      user = {
        id: Date.now().toString(),
        name: name,
        email: email,
        password: '', // No password for Google OAuth users
        googleId: googleId,
        createdAt: new Date().toISOString(),
        role: 'user', // Default role for new Google users
      };
      
      users.push(user);
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    }

    // 4. Generate our app's JWT token
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // 5. Send successful response
    res.status(200).json({
      message: 'Google login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(401).json({ message: 'Invalid Google Token' });
  }
}
