import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import logger from "morgan";
import bodyParser from "body-parser";
import db from "./db/index.js";
import eventsRouter from "./controllers/events.js";
import userRouter from "./controllers/users.js";
import commentRouter from "./controllers/comments.js";
import dealRouter from "./controllers/deals.js";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use(logger("dev"));
app.use(bodyParser.json());

app.use("/comments", commentRouter);
app.use("/events", eventsRouter);
app.use("/users", userRouter);
app.use("/deals", dealRouter);

app.use("/", (req, res) => {
  res.send("Bundle Express App");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
