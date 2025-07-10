import { GoogleGenerativeAI } from "@google/generative-ai";
import { Content } from "../models/content.model.js";
import { User } from "../models/user.model.js";

export const geminiAi = async (req, res, next) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const { prompt } = req.body;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const content = response.text();
    if (content) {
      const data = await Content.create({
        user: req.user?._id,
        content,
      });
      const user = await User.findById(req.user?._id);
      user.history.push(data?._id);
      user.apiRequestCount += 1;
      await user.save();
      res.status(201).json({
        success: true,
        content,
      });
    }
  } catch (error) {
    next(error);
  }
};
