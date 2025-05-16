import { Router } from "express";

const router = Router();

import {
  createJob,
  deleteJob,
  editJob,
  getAllJobs,
  getJob,
} from "../controllers/jobController.js";

// GET ALL JOBS
// router.get("", getAllJobs);

// GET A SINGLE JOB
// router.get("/:id", getJob);

// CREATE JOB
// router.post("", createJob);

// EDIT JOB
// router.put("/:id", editJob);

// DELETE JOB
// router.delete("/:id", deleteJob);

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getJob).put(editJob).delete(deleteJob);

export default router;
