import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Content } from "../models/content.model.js";
import { User } from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

// Registration
export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    //Validate Inputs
    if (!username || !email || !password) {
      res.status(400);
      throw new Error("Please provide all details.");
    }
    //Check user email
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("Email already in use.");
    }
    //Hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    //Trial Period
    const newTrialExpiryDate = new Date(
      new Date().getTime() + 3 * 24 * 60 * 60 * 1000
    );
    //NewUser
    const newuser = new User({
      username,
      email,
      password: hashedPassword,
      trialExpires: newTrialExpiryDate,
      monthlyRequestCount: 10,
    });
    await newuser.save();
    res.json({
      success: true,
      message: "Registration Successfull",
      user: {
        username,
        email,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Please provide all details");
    }
    //Check for email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error("Invalid email or password");
    }
    //Validaet Password
    const isPasswordValid = await bcrypt.compare(password, user?.password);
    if (isPasswordValid) {
      generateToken(res, user._id);
      res.status(200).json({
        success: true,
        message: `Welcome ${user?.username}`,
        user: { id: user?._id, username: user?.username, email: user?.email },
      });
    } else {
      res.status(400);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    next(error);
  }
};

// Logout
export const logout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: true,
    sameSite: "none",
  });
  if (req.session) {
    req.session.destroy();
  }
  res.status(200).json({ success: true, message: "User Logged Out" });
};

// Profile
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user?._id)
      .select("-password")
      .populate("payments")
      .populate("history");
    if (user) {
      res.status(200).json({ success: true, user });
    } else {
      res.status(400);
      throw new Error("Invalid User");
    }
  } catch (error) {
    next(error);
  }
};

//Update Profile
export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { ...req.body },
      { new: true }
    );
    if (user) {
      res
        .status(200)
        .json({ success: true, message: "User profile updated", user });
    }
  } catch (error) {
    next(error);
  }
};

//Delete Profile
export const deleteProfile = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    if (user) {
      res.status(200).json({ success: true, message: "See you again!" });
    }
  } catch (error) {
    next(error);
  }
};

//User Authentication
export const authUser = async (req, res, next) => {
  try {
    const decode = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    if (decode?.userId) {
      res.status(200).json({
        userAuthenticated: true,
      });
    }
  } catch (error) {
    next(error);
  }
};

// DELETE HISTORY IN USER DETAILS
export const deleteHistory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;
    const user = await User.findById(userId);
    const content = await Content.findById(id);
    const deleteOne = user.history.filter(
      (ele) => ele.toString() !== content._id.toString()
    );
    user.history = deleteOne;
    await user.save();
    if (user) {
      res.status(200).json({
        success: true,
        message: "Content History Deleted Successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};
