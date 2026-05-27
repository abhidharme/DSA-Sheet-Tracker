import Progress from "../models/Progress.js";

const getProgress = async (req, res) => {
  const progress = await Progress.findOne({ user: req.userId });
  return res.json(progress || { completedProblems: [] });
};

const toggleProblemProgress = async (req, res) => {
  const { problemId } = req.params;
  let progress = await Progress.findOne({ user: req.userId });

  if (!progress) {
    progress = await Progress.create({ user: req.userId, completedProblems: [] });
  }

  const exists = progress.completedProblems.includes(problemId);
  if (exists) {
    progress.completedProblems = progress.completedProblems.filter((id) => id !== problemId);
  } else {
    progress.completedProblems.push(problemId);
  }

  await progress.save();

  return res.json({
    message: exists ? "Problem marked as incomplete" : "Problem marked as complete",
    completedProblems: progress.completedProblems,
  });
};

export { getProgress, toggleProblemProgress };
