import {
  createChat,
  findChat,
  getClientDetails,
  userChats,
} from "../controllers/chatController.js";
import express from "express";

const chatRouter = express.Router();

chatRouter.post("/createChat", createChat);
chatRouter.get("/:userId", userChats);
chatRouter.get("/find/:firstId/:secondId", findChat);
chatRouter.get("/getUser/:userId", getClientDetails);

export default chatRouter;
