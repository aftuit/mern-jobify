import "express-async-errors";

import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

import jobsRouter from "./routes/jobRouter.js";

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.post("/");

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("/api/v1/jobs", jobsRouter);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "Not Found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ msg: "Something went wrong!" });
});

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
