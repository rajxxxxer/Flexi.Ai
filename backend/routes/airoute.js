import express from 'express';
import { auth } from '../middlewares/auth.js';
import { generateArticle, generateBlogTitle, generateImage, removeImageBackground, removeImageObject, resumeReview } from '../controllers/aicont.js';
import { upload } from '../configs/multer.js';
const airouter=express.Router();

airouter.post('/generate-article', auth, generateArticle);

airouter.post('/generate-blog', auth, generateBlogTitle);
airouter.post('/generate-image', auth, generateImage);
airouter.post('/resume', auth, resumeReview);
airouter.post('/remove-bg', auth, upload.single('image'), removeImageBackground);
airouter.post('/remove-obj', auth, upload.single('image'), removeImageObject);



export default airouter;

