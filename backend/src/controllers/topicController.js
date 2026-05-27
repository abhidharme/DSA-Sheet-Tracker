import Topic from "../models/Topic.js";

const getTopics = async (_req, res) => {
  const topics = await Topic.find().sort({ createdAt: 1 });
  return res.json(topics);
};

export { getTopics };
