const { Schema } = require("mongoose");

const Deal = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
      required: true,
    },
    bundle_number: {
      type: Number,
      required: false,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    category: {
      type: String,
      enum: [
        "Lifestyle",
        "Health",
        "Fitness",
        "Travel",
        "Food",
        "Entertainment",
      ],
    },
    joined_users: [
      {
        type: Schema.Types.ObjectId,
        ref: "user_id",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    title: {
      type: String,
      required: true,
    },
    original_price: {
      type: Number,
      required: true,
    },
    discount_price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = Deal;
