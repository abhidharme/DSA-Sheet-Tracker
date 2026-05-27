import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import ProblemCard from "../components/ProblemCard";
import useDebounce from "../hooks/useDebounce";

const TopicsPage = () => {
  const { items: topics, loading } = useSelector((state) => state.topics);
  const { completedProblems } = useSelector((state) => state.progress);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("all");
  const debouncedSearch = useDebounce(search, 250);

  const filteredTopics = useMemo(
    () =>
      topics
        .map((topic) => ({
          ...topic,
          problems: topic.problems.filter((problem) => {
            const matchesSearch = problem.title.toLowerCase().includes(debouncedSearch.toLowerCase());
            const matchesDiff = difficulty === "all" || problem.difficulty === difficulty;
            return matchesSearch && matchesDiff;
          }),
        }))
        .filter((topic) => topic.problems.length > 0),
    [topics, debouncedSearch, difficulty]
  );

  if (loading) return <Loader text="Loading topics..." />;

  return (
    <div className="space-y-4">
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

      {filteredTopics.map((topic) => (
        <section key={topic._id} className="space-y-3">
          <h3 className="text-lg font-semibold text-slate-900">{topic.name}</h3>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {topic.problems.map((problem) => (
              <ProblemCard key={problem._id} problem={problem} completed={completedProblems.includes(problem._id)} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default TopicsPage;
