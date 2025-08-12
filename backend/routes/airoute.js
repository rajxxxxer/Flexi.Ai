import express from 'express';
import { auth } from '../middlewares/auth.js';
import { generateArticle } from '../controllers/aicont.js';
const airouter=express.Router();

airouter.post('/generate-article', auth, generateArticle);
export default airouter;
