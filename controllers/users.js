import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/index.js";
import jwt from "jsonwebtoken";
import verifyToken from "../middlewares/verify-token.js";

const router = express.Router();

const SALT_LENGTH = 12;

router.post("/signup", async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.json({ error: "Username already taken." });
    }
    const hashedPassword = await bcrypt.hashSync(
      req.body.password,
      SALT_LENGTH
    );
    const user = await User.create({
      username: req.body.username,
      hashedPassword: hashedPassword,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      type: req.body.type,
    });
    const token = jwt.sign(
      { username: user.username, _id: user._id },
      process.env.JWT_SECRET
    );
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const password = await bcrypt.compareSync(
      req.body.password,
      user.hashedPassword
    );
    if (user && password) {
      const token = jwt.sign(
        { username: user.username, _id: user._id },
        process.env.JWT_SECRET
      );
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: "Invalid username or password." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:userId", verifyToken, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      res.status(200).json(deletedUser);
    } else {
      res.status(401).json({ error: "Invalid username or password." });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:userId", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ error: "User not found." });
    }
  } catch {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:userId", verifyToken, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
