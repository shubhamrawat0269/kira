import { Navigate } from "react-router-dom";
import Signin from "./components/custom/Signin";
import Signup from "./components/custom/Signup";
import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProjectDetail from "./pages/ProjectDetail";
import LandingPage from "./pages/LandingPage";
import ErrorPage from "./pages/ErrorPage";

const isLoggedIn = !!localStorage.getItem("token");

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: isLoggedIn ? <Navigate to="/dashboard" /> : <LandingPage />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/signin",
    element: (
      <PublicRoute>
        <Signin />
      </PublicRoute>
    ),
    children: [],
  },
  {
    path: "/project/:projectId",
    element: (
      <ProtectedRoute>
        <ProjectDetail />
      </ProtectedRoute>
    ),
    children: [],
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <Signup />
      </PublicRoute>
    ),
    children: [],
  },
]);

export default router;
