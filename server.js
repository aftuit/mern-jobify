import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import { nanoid } from "nanoid";

let jobs = [
  { id: nanoid(), company: "apple", position: "front-end" },
  { id: nanoid(), company: "google", position: "back-end" },
];

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.post("/", (req, res) => {
  console.log(req);
  res.json({ message: "Data received", data: req.body });
});

app.get("/", (req, res, next) => {
  res.send("Hello world!");
});

// GET ALL JOBS
app.get("/api/v1/jobs", (req, res, next) => {
  res.status(200).json({ jobs });
});

// GET A SINGLE JOB
app.get("/api/v1/jobs/:id", (req, res, next) => {
  const { id } = req.params;

  const job = jobs.find((job) => job.id === id);
  if (!job) {
    res.status(400).json({ msg: "Not found job with id: " + id });
  }
  res.status(200).json({ job });
});

// CREATE JOB
app.post("/api/v1/jobs", (req, res) => {
  const { position, company } = req.body;

  if (!position || !company) {
    res.status(400).json({ msg: "Please, provide position and company" });
    return;
  }
  const id = nanoid(10);
  const job = {
    id,
    company,
    position,
  };

  jobs.push(job);

  res.status(201).json({ job });
});

// EDIT JOB
app.put("/api/v1/jobs/:id", (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res
      .status(400)
      .json({ msg: "Please, provide position and company" });
  }

  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ msg: "Not found job with id: " + id });
  }

  const job = jobs.find((job) => job.id == id);
  if (!job) {
    return res.status(400).json({ msg: "Not found job with id: " + id });
  }

  job.position = position;
  job.company = company;

  res.status(201).json({ job });
});

// DELETE JOB

app.delete("/api/v1/jobs/:id", (req, res) => {
  const { id } = req.params;

  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(400).json({ msg: "Not found job with id: " + id });
  }

  jobs = jobs.filter((job) => job.id !== id);

  res.status(200).json({ msg: "Job deleted" });
});

const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
