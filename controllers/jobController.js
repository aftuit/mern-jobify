import Job from "../models/jobModel.js";

import { nanoid } from "nanoid";

let jobs = [
  { id: nanoid(), company: "apple", position: "front-end" },
  { id: nanoid(), company: "google", position: "back-end" },
];

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.json({ message: "Data received", data: { jobs } });
};
export const getJob = async (req, res) => {
  const { id } = req.params;

  const job = await Job.findById(id);
  if (!job) {
    res.status(400).json({ msg: "Not found job with id: " + id });
  }
  res.status(200).json({ job });
};

export const createJob = async (req, res) => {
  const { position, company } = req.body;
  const job = await Job.create({ company, position });
  res.status(201).json({ job });
};

export const editJob = (req, res) => {
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
};
export const deleteJob = (req, res) => {
  const { id } = req.params;

  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(400).json({ msg: "Not found job with id: " + id });
  }

  jobs = jobs.filter((job) => job.id !== id);

  res.status(200).json({ msg: "Job deleted" });
};
