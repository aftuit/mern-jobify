import Job from "../models/jobModel.js";
import { StatusCodes } from "http-status-codes";

import { nanoid } from "nanoid";

let jobs = [
  { id: nanoid(), company: "apple", position: "front-end" },
  { id: nanoid(), company: "google", position: "back-end" },
];

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ message: "Data received", data: { jobs } });
};
export const getJob = async (req, res) => {
  const { id } = req.params;

  const job = await Job.findById(id);
  if (!job) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Not found job with id: " + id });
  }
  res.status(StatusCodes.OK).json({ job });
};

export const createJob = async (req, res) => {
  const { position, company } = req.body;
  const job = await Job.create({ company, position });
  res.status(StatusCodes.CREATED).json({ job });
};

export const editJob = async (req, res) => {
  const { id } = req.params;

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedJob) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Not found job with id: " + id });
  }

  res.status(StatusCodes.OK).json({ msg: "Job updated", job: updatedJob });
};
export const deleteJob = async (req, res) => {
  const { id } = req.params;

  const removedJob = await Job.findByIdAndDelete(id);
  if (!removedJob) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Not found job with id: " + id });
  }

  jobs = jobs.filter((job) => job.id !== id);

  res.status(StatusCodes.OK).json({ msg: "Job deleted", job: removedJob });
};
