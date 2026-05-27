const InputField = ({ label, error, ...props }) => (
  <label className="flex w-full flex-col gap-1 text-sm">
    <span className="font-medium text-slate-700">{label}</span>
    <input
      className="rounded-lg border border-slate-300 px-3 py-2 outline-none ring-indigo-200 transition focus:ring-2"
      {...props}
    />
    {error && <span className="text-xs text-red-600">{error}</span>}
  </label>
);

export default InputField;
