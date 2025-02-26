import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Successfully connect to MongoDB");
  })
  .catch((error) => {
    console.error("Connection Error", error.message);
  });

const db = mongoose.connection;

export default db;
