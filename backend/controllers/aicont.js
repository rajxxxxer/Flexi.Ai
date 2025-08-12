import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from 'axios';
import {v2 as cloudinary} from 'cloudinary';
import FormData from "form-data";


const Ai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export const generateArticle = async (req, res) => {
  try {
    
    const { userId } = req.auth();
    const { prompt,length } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.status(403).json({ error: "Free tier limit reached" });
    }

    const response = await Ai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: length

    });

    const choice = response.choices?.[0] || {};
const content =
  choice.message?.content ||
  choice.content?.[0]?.text ||
  "";



    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'article')
    `;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1
        }
      });
    }

    return res.json({ success: true, content });

  } catch (err) {
    console.error("Error generating article:", err.response?.data || err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const generateBlogTitle = async (req, res) => {
  try {
    
    const { userId } = req.auth();
    const { prompt } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.status(403).json({ error: "this feature is not available on the free plan" });
    }

  const response = await Ai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 100

    });

    const choice = response.choices?.[0] || {};
const content =
  choice.message?.content ||
  choice.content?.[0]?.text ||
  "";



    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'blog-title')
    `;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1
        }
      });
    }

    return res.json({ success: true, content });

  } catch (err) {
    console.error("Error generating article:", err.response?.data || err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const plan = req.plan;
    

    if (plan !== "premium" ) {
      return res.status(403).json({ error: "Free tier limit reached" });
    }

   const formdata = new FormData()
formdata.append('prompt', prompt)

const{data}=await axios.post('https://clipdrop-api.co/text-to-image/v1', formdata, {
  headers: {
    'x-api-key': process.env.CLIP_DROP_API_KEY,
    
  },
  responseType: 'arraybuffer'
})
const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`
const { secure_url } = await cloudinary.uploader.upload(base64Image)





    await sql`
      INSERT INTO creations (user_id, prompt, content, type, publish)
      VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})
    `;

 

    return res.json({ success: true, secure_url });

  } catch (err) {
    console.error("Error generating article:", err.response?.data || err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

