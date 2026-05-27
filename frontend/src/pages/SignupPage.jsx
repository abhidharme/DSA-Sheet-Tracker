import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { signupUser } from "../redux/slices/authSlice";

const SignupPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const validate = () => {
    const next = {};
    if (!formData.name) next.name = "Name is required";
    if (!formData.email) next.email = "Email is required";
    if (!formData.password || formData.password.length < 6) next.password = "Password must be at least 6 characters";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    const result = await dispatch(signupUser(formData));
    if (signupUser.fulfilled.match(result)) {
      window.alert("Signup success");
      navigate("/");
    } else {
      window.alert(result.payload || "Signup failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-4 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Signup</h2>
        <InputField
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          error={errors.name}
        />
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
          {loading ? "Creating account..." : "Signup"}
        </Button>
        <p className="text-sm text-slate-600">
          Already have an account?{" "}
          <Link className="text-indigo-600 hover:underline" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
