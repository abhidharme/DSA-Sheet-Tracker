import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import ProblemCard from "../components/ProblemCard";
import ProgressBar from "../components/ProgressBar";
import Sidebar from "../components/Sidebar";
import TopicCard from "../components/TopicCard";
import useDebounce from "../hooks/useDebounce";
import useFetch from "../hooks/useFetch";
import useProgress from "../hooks/useProgress";
import { fetchProgress } from "../redux/slices/progressSlice";
import { fetchTopics } from "../redux/slices/topicSlice";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: topics, loading: topicLoading } = useSelector((state) => state.topics);
  const { completedProblems } = useSelector((state) => state.progress);
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("all");
  const debouncedSearch = useDebounce(search, 250);
  const { completedCount, totalProblems, overallPercent, topicProgress } = useProgress();

  useFetch(() => {
    dispatch(fetchTopics());
    dispatch(fetchProgress());
  }, [dispatch]);

  const filteredTopics = useMemo(() => {
    const source = selectedTopic === "all" ? topics : topics.filter((topic) => topic._id === selectedTopic);
    return source
      .map((topic) => ({
        ...topic,
        problems: topic.problems.filter((problem) => {
          const matchesSearch = problem.title.toLowerCase().includes(debouncedSearch.toLowerCase());
          const matchesDiff = difficulty === "all" || problem.difficulty === difficulty;
          return matchesSearch && matchesDiff;
        }),
      }))
      .filter((topic) => topic.problems.length > 0);
  }, [topics, selectedTopic, debouncedSearch, difficulty]);

  if (topicLoading) return <Loader text="Loading dashboard..." />;

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar user={user} />
      <div className="flex flex-col md:flex-row">
        <Sidebar topics={topics} selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} />
        <main className="flex-1 space-y-5 p-4">
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

          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid gap-3 md:grid-cols-2">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search problems..."
                className="rounded-lg border border-slate-300 px-3 py-2"
              />
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="rounded-lg border border-slate-300 px-3 py-2"
              >
                <option value="all">All Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Tough">Tough</option>
              </select>
            </div>
          </section>

          <section className="space-y-4">
            {filteredTopics.map((topic) => (
              <div key={topic._id} className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">{topic.name}</h3>
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {topic.problems.map((problem) => (
                    <ProblemCard key={problem._id} problem={problem} completed={completedProblems.includes(problem._id)} />
                  ))}
                </div>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
