import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout/MainLayout";
import DashboardLayout from "../components/layouts/DashboardLayout/DashboardLayout";
import ProtectedRoutes from "../components/Protected/ProtectedRoutes";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import { userRoles } from "../interface/global.interface";
import { adminRoutes } from "./admin.routes";
import { routesGenerator } from "../utils/routesGenertor";
import { managerRoutes } from "./manager.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoutes roles={[userRoles.superAdmin, userRoles.admin]}>
        <DashboardLayout />
      </ProtectedRoutes>
    ),
    children: routesGenerator(adminRoutes),
  },
  {
    path: "/manager",
    element: (
      <ProtectedRoutes roles={[userRoles.manager]}>
        <DashboardLayout />
      </ProtectedRoutes>
    ),
    children: routesGenerator(managerRoutes),
  },
]);

export default router;
