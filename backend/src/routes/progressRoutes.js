import express from "express";
import { getProgress, toggleProblemProgress } from "../controllers/progressController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getProgress);
router.patch("/:problemId", protect, toggleProblemProgress);

export default router;
