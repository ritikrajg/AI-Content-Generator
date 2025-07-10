import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const protect = async (req, res, next) => {
  try {
    let token;
    token = req.cookies.jwt;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select("-password");
        next();
      } catch (error) {
        res.status(401);
        throw new Error(`Not Authorized, Invalid Token`);
      }
    } else {
      res.status(401);
      throw new Error(`Not Authorized, No Token`);
    }
  } catch (error) {
    next(error);
  }
};
