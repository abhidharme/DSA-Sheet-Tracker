import { useSelector } from "react-redux";
import TopicCard from "../components/TopicCard";
import ProgressBar from "../components/ProgressBar";
import Loader from "../components/Loader";
import useProgress from "../hooks/useProgress";

const OverviewPage = () => {
  const { loading } = useSelector((state) => state.topics);
  const { completedCount, totalProblems, overallPercent, topicProgress } = useProgress();

  if (loading) return <Loader text="Loading overview..." />;

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Overall Progress</h2>
          <span className="text-sm text-slate-500">
            {completedCount}/{totalProblems}
          </span>
        </div>
        <ProgressBar value={overallPercent} />
      </section>

      <section className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {topicProgress.map((topic) => (
          <TopicCard key={topic.topicId} name={topic.topicName} done={topic.done} total={topic.total} percent={topic.percent} />
        ))}
      </section>
    </div>
  );
};

export default OverviewPage;
