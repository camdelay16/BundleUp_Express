import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema(
  {
    author_id: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
    event_id: { type: Schema.Types.ObjectId, required: false },
    deal_id: { type: Schema.Types.ObjectId, required: false },
    rating: { type: Number, required: true },
  },
  { timestamps: true }
);

export default CommentSchema;
