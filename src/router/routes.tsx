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
      <ProtectedRoutes>
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
        element: <CreateProduct />,
      },
      {
        path: "product",
        element: <AllProduct />,
      },
      {
        path: "product/duplicate",
        element: <DuplicateProduct />,
      },
      {
        path: "product/:productId",
        element: <UpdateProduct />,
      },
      {
        path: "sell-product",
        element: <SellProduct />,
      },
      {
        path: "sales-history",
        element: <SalesHistory />,
      },
    ],
  },
]);

export default router;
