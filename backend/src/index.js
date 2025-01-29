import express from "express";
import authRoutes from "./routes/auth.routh.js";
import messageRoutes from "./routes/message.routh.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from 'path'

import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

dotenv.config();
const PORT = process.env.PORT;
const _dirname = path.resolve()

app.use(express.json({ limit: "50mb" })); // Increase JSON payload size limit
app.use(express.urlencoded({ limit: "50mb", extended: true })); // Increase URL-encoded payload size limit
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

if(process.env.NODE_ENV==='production'){
  app.use(express.static(path.join(_dirname, '../Frontend/dist')))

  app.get('*',(req,res)=>{
    res.sendFile(path.join(_dirname,'../Frontend','dist','index.html'))

  })
}

server.listen(PORT, () => {
  console.log("Server is running on PORT:" + PORT);
  connectDB();
});
