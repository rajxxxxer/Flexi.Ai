import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from 'axios';
import {v2 as cloudinary} from 'cloudinary';
import FormData from "form-data";
import fs from "fs"
import pdf from 'pdf-parse/lib/pdf-parse.js   ';

const Ai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length, location } = req.body; // ✅ include location
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 20) {
      return res.status(403).json({ error: "Free tier limit reached" });
    }

    // ✅ Modify the prompt to include location if provided
    const finalPrompt = location
      ? `${prompt} in ${location}`
      : prompt;

    const response = await Ai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        { role: "user", content: finalPrompt }
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
      VALUES (${userId}, ${finalPrompt}, ${content}, 'article')
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

    if (plan !== "premium" && free_usage >= 20) {
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
    const { userId, plan } = req;
    const { prompt, publish } = req.body;

    if (plan !== "premium" && req.free_usage >= 20) {
      return res.status(403).json({ error: "Free tier limit reached" });
    }

    const formdata = new FormData();
    formdata.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formdata,
      {
        headers: { "x-api-key": process.env.CLIP_DROP_API_KEY },
        responseType: "arraybuffer",
      }
    );

    const base64Image = `data:image/png;base64,${Buffer.from(data, "binary").toString("base64")}`;
    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    await sql`
      INSERT INTO creations (user_id, prompt, content, type, publish)
      VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})
    `;

    return res.json({ success: true, content: secure_url });
  } catch (err) {
    console.error("Error generating image:", err.response?.data || err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const removeImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const image = req.file;
    const plan = req.plan;
    if (plan !== "premium" && req.free_usage >= 20) {
      return res.status(403).json({ error: "Free tier limit reached" });
    }

  

const { secure_url } = await cloudinary.uploader.upload(image.path,{
  transformation:[
    { effect: "background_removal",
      background_removal:'remove_the_background'
     }
  ]
})






    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId},'Remove background from image', ${secure_url}, 'image')
    `;

 

    return res.json({ success: true, content: secure_url });

  } catch (err) {
    console.error("Error generating article:", err.response?.data || err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const removeImageObject = async (req, res) => {
  try {
  
    const { userId } = req.auth();
    const  image  = req.file;
    const plan = req.plan;
    const {object}=req.body;

    if (plan !== "premium" && req.free_usage >= 20) {
      return res.status(403).json({ error: "Free tier limit reached" });
    }

  

const { public_id } = await cloudinary.uploader.upload(image.path)

const imageurl =cloudinary.url(public_id, {
  transformation: [
    { effect: `gen_remove:${object}` }
  ],
  resource_type:'image'
});






    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId},${`Remove ${object} from image`}, ${imageurl}, 'object')
    `;

    return res.json({ success: true, content: imageurl });

  } catch (err) {
    console.error("Error generating article:", err.response?.data || err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const plan = req.plan;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Resume file is required" });
    }

    const resume = req.file;

    if (plan !== "premium" && req.free_usage >= 20) {
      return res.status(403).json({ error: "Free tier limit reached" });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.json({ success: false, message: "File size exceeds 5MB limit" });
    }

    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await pdf(dataBuffer);

    const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement:\n\n${pdfData.text}`;

    const response = await Ai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000 // ✅ yaha 'length' ki jagah fix value rakho
    });

    const content = response.choices?.[0].message?.content;

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, 'Review the resume', ${content}, 'resume')
    `;

    return res.json({ success: true, content });
  } catch (err) {
    console.error("Error generating article:", err.response?.data || err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
