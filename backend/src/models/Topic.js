import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    difficulty: { type: String, enum: ["Easy", "Medium", "Tough"], required: true },
    youtubeLink: String,
    leetcodeLink: String,
    codeforcesLink: String,
    articleLink: String,
  },
  { timestamps: false }
);

const topicSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    problems: [problemSchema],
  },
  { timestamps: true }
);

const Topic = mongoose.model("Topic", topicSchema);

export default Topic;
