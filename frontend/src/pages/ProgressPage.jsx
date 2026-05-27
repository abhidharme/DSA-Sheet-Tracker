import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import ProgressBar from "../components/ProgressBar";
import useProgress from "../hooks/useProgress";

const ProgressPage = () => {
  const { loading } = useSelector((state) => state.topics);
  const { completedCount, totalProblems, overallPercent, topicProgress } = useProgress();

  if (loading) return <Loader text="Loading progress..." />;

  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-xl font-semibold text-slate-900">Your Progress Report</h2>
        <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
          <span>Completed</span>
          <span>
            {completedCount}/{totalProblems}
          </span>
        </div>
        <ProgressBar value={overallPercent} />
        <p className="mt-2 text-sm text-slate-500">{overallPercent}% of the full sheet completed</p>
      </section>

      <section className="space-y-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Topic-wise Breakdown</h3>
        {topicProgress.map((topic) => (
          <div key={topic.topicId} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-700">{topic.topicName}</span>
              <span className="text-slate-500">
                {topic.done}/{topic.total}
              </span>
            </div>
            <ProgressBar value={topic.percent} />
          </div>
        ))}
      </section>
    </div>
  );
};

export default ProgressPage;
