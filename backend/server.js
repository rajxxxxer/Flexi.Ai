// server.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware, requireAuth } from '@clerk/express';
import airouter from './routes/airoute.js';

import connectCloudinary from './configs/cloudinary.js';
import userrouter from './routes/userRoute.js';

const app = express();
await connectCloudinary();
const PORT = process.env.PORT ? process.env.PORT : 7000;

app.use(cors());
app.use(clerkMiddleware());
app.use(express.json());

// Public route
app.get('/', (req, res) => {
  res.send('Server is live!');
});

// Protected routes
app.use('/api/ai', requireAuth(), airouter);
app.use('/api/user', requireAuth(), userrouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
