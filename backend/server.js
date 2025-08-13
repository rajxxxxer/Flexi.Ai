// server.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware, requireAuth } from '@clerk/express';
import airouter from './routes/airoute.js';
import { auth } from './middlewares/auth.js';
import connectCloudinary from './configs/cloudinary.js';
import userrouter from './routes/userRoute.js';


const app = express();
await connectCloudinary();
const PORT = 7000;

app.use(cors());
app.use(clerkMiddleware());
app.use(express.json());

// Public route



// Protected routes
app.use('/api/ai', requireAuth(),  airouter);

app.use('/api/user', requireAuth(), userrouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
