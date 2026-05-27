import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { fetchTopics } from "../redux/slices/topicSlice";
import { fetchProgress } from "../redux/slices/progressSlice";

const AppLayout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchTopics());
    dispatch(fetchProgress());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar user={user} />
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
