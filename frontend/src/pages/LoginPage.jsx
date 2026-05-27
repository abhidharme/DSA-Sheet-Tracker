import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { loginUser } from "../redux/slices/authSlice";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const validate = () => {
    const next = {};
    if (!formData.email) next.email = "Email is required";
    if (!formData.password) next.password = "Password is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    const result = await dispatch(loginUser(formData));
    if (loginUser.fulfilled.match(result)) {
      window.alert("Login success");
      navigate("/");
    } else {
      window.alert(result.payload || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-4 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Login</h2>
        <InputField
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          error={errors.email}
        />
        <InputField
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
          error={errors.password}
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Logging in..." : "Login"}
        </Button>
        <p className="text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link className="text-indigo-600 hover:underline" to="/signup">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
