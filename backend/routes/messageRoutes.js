import express from "express";
import { addMessage, getMessages } from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.post("/addMessage", addMessage);
messageRouter.get("/:chatId", getMessages);

export default messageRouter;
