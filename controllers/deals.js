import express from "express";
import { Deal } from "../models";
import verifyToken from "../middlewares/verify-token";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const deals = await Deal.find({}).sort({ createdAt: "descending" });
    res.status(200).json(deals);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch deals", error: error.message });
  }
});

router.get("/:dealId", async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.dealId);
    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }
    res.status(200).json(deal);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch deal", error: error.message });
  }
});

// Protected Routes

router.use(verifyToken);

router.post("/", async (req, res) => {
  try {
    req.body.author = req.user._id;
    const deal = await Deal.create(req.body);
    deal._doc.author = req.user;
    res.status(201).json(deal);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create deal", error: error.message });
  }
});

router.put("/:dealId", async (req, res) => {
  try {
    const deal = await Deal.findByIdAndUpdate(req.params.dealId, req.body, {
      new: true,
    });
    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }
    res.status(200).json(deal);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update deal", error: error.message });
  }
});

router.delete("/:dealId", async (req, res) => {
  try {
    const deal = await Deal.findByIdAndDelete(req.params.dealId);
    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }
    res.status(200).json({ message: "Deal deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete deal", error: error.message });
  }
});

module.exports = router;
