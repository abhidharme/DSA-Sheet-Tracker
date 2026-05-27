import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Topic from "../models/Topic.js";

dotenv.config();

const topicNames = [
  "Arrays",
  "Strings",
  "Linked List",
  "Stack",
  "Queue",
  "Trees",
  "Graphs",
  "DP",
  "Recursion",
  "Binary Search",
  "Greedy",
  "Heap",
  "Sliding Window",
];

const difficulties = ["Easy", "Medium", "Tough"];

const topics = topicNames.map((topic, topicIdx) => ({
  name: topic,
  slug: topic.toLowerCase().replace(/\s+/g, "-"),
  problems: Array.from({ length: 5 }).map((_, problemIdx) => {
    const sequence = topicIdx * 5 + problemIdx + 1;
    return {
      title: `${topic} Problem ${problemIdx + 1}`,
      difficulty: difficulties[sequence % 3],
      youtubeLink: `https://www.youtube.com/results?search_query=${encodeURIComponent(`${topic} problem ${problemIdx + 1}`)}`,
      leetcodeLink: "https://leetcode.com/problemset/",
      codeforcesLink: "https://codeforces.com/problemset",
      articleLink: "https://www.geeksforgeeks.org/",
    };
  }),
}));

const seedData = async () => {
  try {
    await connectDB();
    await Topic.deleteMany({});
    await Topic.insertMany(topics);
    // eslint-disable-next-line no-console
    console.log("Seed data inserted successfully");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Seed failed:", error.message);
  } finally {
    await mongoose.connection.close();
  }
};

seedData();
