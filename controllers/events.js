import express from "express";
import verifyToken from "../middlewares/verify-token.js";
import { Event } from "../models/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const events = await Event.find({})
      .populate("eventTitle")
      .sort({ startDateTime: "descending" });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:eventId", async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId).populate(
      "eventTitle"
    );
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Protected Routes

router.use(verifyToken);

router.post("/", async (req, res) => {
  try {
    req.body.author = req.user._id;
    const event = await Event.create(req.body);
    event._doc.author = req.user;
    res.status(201).json(event);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put("/:eventId", async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.eventId,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:eventId", async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);

    const deletedEvent = await Event.findByIdAndDelete(req.params.eventId);
    res.status(200).json(deletedEvent);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
