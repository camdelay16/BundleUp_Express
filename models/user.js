import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  joinedEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: "event_id",
    },
  ],
  joinedDeals: [
    {
      type: Schema.Types.ObjectId,
      ref: "deal_id",
    },
  ],
  type: {
    type: String,
    required: true,
    enum: ["Individual", "Vendor"],
  },
});

export default UserSchema;
