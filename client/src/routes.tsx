import { createBrowserRouter } from "react-router-dom";
import Signin from "./components/custom/Signin";
import Signup from "./components/custom/Signup";
import DashboardLayout from "@/layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import About from "./pages/About";
import ProjectDetail from "./pages/ProjectDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "/about",
        element: (
          <ProtectedRoute>
            <About />
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
