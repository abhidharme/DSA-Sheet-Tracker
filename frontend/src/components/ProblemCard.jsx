import { useDispatch } from "react-redux";
import { toggleProgress } from "../redux/slices/progressSlice";

const diffColors = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Tough: "bg-red-100 text-red-700",
};

const ProblemCard = ({ problem, completed }) => {
  const dispatch = useDispatch();

  const handleToggle = async () => {
    const result = await dispatch(toggleProgress(problem._id));
    const message = result.payload?.message || result.payload;
    if (typeof message === "string") window.alert(message);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-2">
        <h4 className="font-semibold text-slate-900">{problem.title}</h4>
        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${diffColors[problem.difficulty]}`}>
          {problem.difficulty}
        </span>
      </div>
      <div className="mb-3 flex flex-wrap gap-2 text-xs">
        <span className="cursor-default rounded-md bg-slate-100 px-2 py-1 text-slate-600 select-none">
          YouTube
        </span>
        <span className="cursor-default rounded-md bg-slate-100 px-2 py-1 text-slate-600 select-none">
          LeetCode
        </span>
        <span className="cursor-default rounded-md bg-slate-100 px-2 py-1 text-slate-600 select-none">
          Codeforces
        </span>
        <span className="cursor-default rounded-md bg-slate-100 px-2 py-1 text-slate-600 select-none">
          Article
        </span>
      </div>
      <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
        <input type="checkbox" checked={completed} onChange={handleToggle} />
        Mark as completed
      </label>
    </div>
  );
};

export default ProblemCard;
