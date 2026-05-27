import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import LoginPage from "../pages/LoginPage";
import OverviewPage from "../pages/OverviewPage";
import ProgressPage from "../pages/ProgressPage";
import SignupPage from "../pages/SignupPage";
import TopicsPage from "../pages/TopicsPage";

const AppRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<OverviewPage />} />
      <Route path="topics" element={<TopicsPage />} />
      <Route path="progress" element={<ProgressPage />} />
    </Route>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
