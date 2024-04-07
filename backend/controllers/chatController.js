import Chat from "../models/chatModel.js";
import { Types } from "mongoose";
import Instructor from "../models/InstructorModel.js";
import User from "../models/userModel.js";

export const createChat = async (req, res) => {
  const existingChat = await Chat.findOne({
    members: { $all: [req.body.senderId, req.body.receiverId] },
  });
  if (existingChat) {
    existingChat.updatedAt = new Date();
    await existingChat.save();

    res.status(200).json(existingChat);
  } else {
    const newChat = new Chat({
      members: [req.body.senderId, req.body.receiverId],
    });
    try {
      const result = await newChat.save();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

export const userChats = async (req, res) => {
  try {
    const chat = await Chat.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const findChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getClientDetails = async (req, res) => {
  try {
    const userDetails = await User.findOne({ _id: req.params.userId });
    const instructorDetails = await Instructor.findOne({
      _id: req.params.userId,
    });

    if (!userDetails && !instructorDetails) {
      return res.status(404).json({ message: "User orInstructor not found" });
    }

    if (userDetails) {
      return res.status(200).json({ userDetails });
    }

    return res.status(200).json({ instructorDetails });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};
