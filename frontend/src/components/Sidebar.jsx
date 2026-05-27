import { NavLink } from "react-router-dom";

const Sidebar = () => (
  <aside className="w-full border-r border-slate-200 bg-white p-4 md:w-72">
    <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Navigation</h2>
    <div className="flex gap-2 overflow-x-auto md:flex-col">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `rounded-md px-3 py-2 text-left text-sm ${isActive ? "bg-indigo-50 text-indigo-700" : "bg-slate-100 text-slate-700"}`
        }
      >
        Overview
      </NavLink>
      <NavLink
        to="/topics"
        className={({ isActive }) =>
          `rounded-md px-3 py-2 text-left text-sm ${isActive ? "bg-indigo-50 text-indigo-700" : "bg-slate-100 text-slate-700"}`
        }
      >
        Topics
      </NavLink>
      <NavLink
        to="/progress"
        className={({ isActive }) =>
          `rounded-md px-3 py-2 text-left text-sm ${isActive ? "bg-indigo-50 text-indigo-700" : "bg-slate-100 text-slate-700"}`
        }
      >
        Progress
      </NavLink>
    </div>
  </aside>
);

export default Sidebar;
