import express from "express";

import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/adminRoutes.js";
import instructorRoutes from "./routes/instructorRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";
import http from "http";
import path from "path";
const currentWorkingDir = path.resolve();
const parentDir = path.dirname(currentWorkingDir);

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
dotenv.config();
import cloudinary from "cloudinary";
import bodyParser from "body-parser";
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDAPISECRET,
});

const corsOptions = {
  origin: true,
  credentials: true,
};
const port = process.env.PORT || 5000;
connectDB();
const app = express();

const server = http.createServer(app);



app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/instructor", instructorRoutes);
app.use("/api/chat", chatRouter)
app.use("/api/message",messageRouter)
app.use(cors(corsOptions));
const enviornment = "production";

if (enviornment === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(parentDir, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(parentDir, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}         

app.use(notFound);
app.use(errorHandler);

let socketport=app.listen(port, () => console.log(`Server started on port ${port}`));
const io = new Server(socketport, {
  cors: {
    origin: "http://localhost:3002",
  },
});
// Socket.IO logic
let activeUsers = [];

io.on("connection", (socket) => {
  // add new User
  socket.on("new-user-add", (newUserId) => {
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
    }
    io.emit("get-users", activeUsers);
  }); 

 

  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    io.emit("get-users", activeUsers);
  });

  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
    }
  });
});