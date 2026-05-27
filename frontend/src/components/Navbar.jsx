import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import Button from "./Button";

const Navbar = ({ user }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.alert("Logged out");
  };

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
      <h1 className="text-lg font-bold text-slate-900">DSA Sheet Tracker</h1>
      <div className="flex items-center gap-3">
        <span className="hidden text-sm text-slate-600 sm:block">{user?.name}</span>
        <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-500">
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
