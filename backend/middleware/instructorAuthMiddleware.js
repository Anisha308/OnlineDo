import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Instructor from "../models/InstructorModel.js";

const protect = asyncHandler(async (req, res, next) => {
  const parentDir = path.dirname(currentWorkingDir);
  if (enviornment === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(parentDir, '/frontend/dist')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(parentDir, 'frontend', 'dist', 'index.html'))
    );
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  }
  const currentWorkingDir = path.resolve();
})
export { protect };
