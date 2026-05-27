import { useMemo } from "react";
import { useSelector } from "react-redux";

const useProgress = () => {
  const topics = useSelector((state) => state.topics.items);
  const completed = useSelector((state) => state.progress.completedProblems);

  return useMemo(() => {
    const totalProblems = topics.reduce((sum, topic) => sum + topic.problems.length, 0);
    const completedCount = completed.length;
    const overallPercent = totalProblems ? Math.round((completedCount / totalProblems) * 100) : 0;

    const topicProgress = topics.map((topic) => {
      const done = topic.problems.filter((problem) => completed.includes(problem._id)).length;
      const total = topic.problems.length;
      return {
        topicId: topic._id,
        topicName: topic.name,
        done,
        total,
        percent: total ? Math.round((done / total) * 100) : 0,
      };
    });

    return { totalProblems, completedCount, overallPercent, topicProgress };
  }, [topics, completed]);
};

export default useProgress;
