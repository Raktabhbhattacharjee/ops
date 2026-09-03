import express from "express";
import dotenv from "dotenv";
import { randomInt } from "node:crypto";
import { createClient } from "redis";
import connectDb from "./lib/db.js";
import User from "./model/user.model.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Redis keys are just strings.
// Using ":" helps us organize keys logically.
// Think of it like a folder structure:
// users:all
// users:123
// users:profile:123
const USERS_CACHE_KEY = "users:all";

// Create a Redis client.
// This tells our application where Redis is running.
// The actual connection is opened later using redis.connect().
const redis = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

// Listen for Redis connection errors.
redis.on("error", (error) => {
  console.error("Redis connection error:", error.message);
});

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome to my Redis learning backend!",
    explanation:
      "Redis is a very fast in-memory data store commonly used for caching, sessions, queues, and temporary data.",
  });
});

app.post("/api/users", async (req, res) => {
  try {
    const user = await User.create(req.body);

    // ============================================================
    // REDIS: DEL
    //
    // Deletes the given key from Redis.
    //
    // Here we delete "users:all" because a new user was added
    // to MongoDB, so our cached list of users is now outdated.
    //
    // This is called CACHE INVALIDATION.
    //
    // Database:    [old users + new user]
    // Redis cache: [old users]  <-- stale
    //
    // We delete the cache so the next GET request gets fresh data
    // from MongoDB and creates a new cache.
    // ============================================================
    await redis.del(USERS_CACHE_KEY);

    const safeUser = user.toObject();
    delete safeUser.password;

    return res.status(201).json(safeUser);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

app.get("/api/users", async (_req, res) => {
  try {
    // NORMAL DATABASE CALL: this endpoint always reads directly from MongoDB.
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/rediscall", async (_req, res) => {
  try {
    // REDIS CALL: get() reads the users stored under this Redis key.
    const cachedUsers = await redis.get(USERS_CACHE_KEY);

    if (cachedUsers) {
      // Redis stores JSON as text, so parse it back into JavaScript data.
      return res
        .status(200)
        .json({ source: "redis", users: JSON.parse(cachedUsers) });
    }

    // Redis has no value yet, so get the current users from MongoDB.
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    // setEx() stores the result in Redis for 60 seconds.
    await redis.setEx(USERS_CACHE_KEY, 60, JSON.stringify(users));

    return res.status(200).json({ source: "mongodb -> redis", users });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// otp basiclly if anyone asks for otp i want to you know store it temporarily and delete it
app.post("/otp", async (req, res) => {
  try {
    const email =
      typeof req.body?.email === "string"
        ? req.body.email.trim().toLowerCase()
        : "";

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Generate a 6-digit OTP
    const otp = randomInt(100000, 1000000).toString();

    // Create a unique Redis key for this user
    const key = `otp:${email}`;

    // Store OTP for 60 seconds
    await redis.setEx(key, 60, otp);

    // For learning only — normally you would send this via email/SMS
    console.log(`OTP for ${email}: ${otp}`);

    return res.status(200).json({
      message: "OTP generated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

app.post("/verify-otp", async (req, res) => {
  try {
    const email =
      typeof req.body?.email === "string"
        ? req.body.email.trim().toLowerCase()
        : "";
    const otp = typeof req.body?.otp === "string" ? req.body.otp.trim() : "";

    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP are required" });
    }

    const key = `otp:${email}`;
    const storedOtp = await redis.get(key);

    if (!storedOtp) {
      return res.status(400).json({ error: "OTP is expired or not found" });
    }

    if (storedOtp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // OTPs are one-time values: remove it after successful verification.
    await redis.del(key);

    return res.status(200).json({
      message: "OTP verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

const startServer = async () => {
  await connectDb();

  // ============================================================
  // REDIS: CONNECT
  //
  // Actually connects our Redis client to the Redis server.
  //
  // Redis is running on port 6379 by default.
  // We must connect before using commands such as:
  //
  // redis.get()
  // redis.setEx()
  // redis.del()
  // ============================================================
  await redis.connect();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
