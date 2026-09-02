import express from "express";
import dotenv from "dotenv";
import connectDb from "./lib/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "hello from docker hello how are you ",
  });
});

const startServer = async () => {
  await connectDb();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
