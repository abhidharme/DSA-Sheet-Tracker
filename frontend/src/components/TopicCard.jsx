import ProgressBar from "./ProgressBar";

const TopicCard = ({ name, done, total, percent }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="mb-2 flex items-center justify-between">
      <h3 className="font-semibold text-slate-900">{name}</h3>
      <span className="text-xs text-slate-500">
        {done}/{total}
      </span>
    </div>
    <ProgressBar value={percent} />
  </div>
);

export default TopicCard;
