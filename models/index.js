import mongoose from "mongoose";
import CommentSchema from "./comment";
import EventSchema from "./event";
import UserSchema from "./user";
import DealSchema from "./deal";

const Comment = mongoose.model("Comment", CommentSchema);
const Event = mongoose.model("Event", EventSchema);
const User = mongoose.model("User", UserSchema);
const Deal = mongoose.model("Deal", DealSchema);

UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  },
});

export { Event, Comment, User, Deal };
