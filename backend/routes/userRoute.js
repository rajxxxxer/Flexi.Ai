import express from 'express';
import { auth } from '../middlewares/auth.js';
import { getPublishCreation, getuserCreation, togglelike } from '../controllers/userCont.js';

const userrouter = express.Router();

userrouter.get('/user-creations', auth, getuserCreation);
userrouter.get('/published-creation', auth, getPublishCreation);
userrouter.post('/toggle-like', auth, togglelike);

export default userrouter;
