import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout/MainLayout";
import DashboardLayout from "../components/layouts/DashboardLayout/DashboardLayout";
import Welcome from "../pages/Welcome/Welcome";
import CreateProduct from "../pages/Product/CreateProduct/CreateProduct";
import ProtectedRoutes from "../components/Protected/ProtectedRoutes";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AllProduct from "../pages/Product/AllProduct/AllProduct";
import UpdateProduct from "../pages/Product/UpdateProduct/UpdateProduct";
import SellProduct from "../pages/Sales/SellProduct/SellProduct";
import SalesHistory from "../pages/Sales/SalesHistory/SalesHistory";
import DuplicateProduct from "../pages/Product/DuplicateProduct/DuplicateProduct";
import { userRoles } from "../interface/global.interface";

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
    path: "/dashboard",
    element: (
      <ProtectedRoutes role={undefined}>
        <DashboardLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "welcome",
        element: <Welcome />,
      },
      {
        path: "create-product",
        element: (
          <ProtectedRoutes role={userRoles.manager}>
            <CreateProduct />,
          </ProtectedRoutes>
        ),
      },
      {
        path: "product",
        element: (
          <ProtectedRoutes role={userRoles.manager}>
            <AllProduct />,
          </ProtectedRoutes>
        ),
      },
      {
        path: "product/duplicate",
        element: (
          <ProtectedRoutes role={userRoles.manager}>
            <DuplicateProduct />,
          </ProtectedRoutes>
        ),
      },
      {
        path: "product/:productId",
        element: (
          <ProtectedRoutes role={userRoles.manager}>
            <UpdateProduct />,
          </ProtectedRoutes>
        ),
      },
      {
        path: "sell-product",
        element: (
          <ProtectedRoutes role={userRoles.seller}>
            <SellProduct />,
          </ProtectedRoutes>
        ),
      },
      {
        path: "sales-history",
        element: (
          <ProtectedRoutes role={userRoles.seller}>
            <SalesHistory />,
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

export default router;
