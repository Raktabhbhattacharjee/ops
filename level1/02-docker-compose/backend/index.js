import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    return res.status(200).json({
        message: "hello from docker phase 2 i.e yml "
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});