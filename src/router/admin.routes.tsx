import CreateManager from "../pages/Manager/CreateManager/createManager";
import AllProduct from "../pages/Product/AllProduct/AllProduct";
import CreateProduct from "../pages/Product/CreateProduct/CreateProduct";
import DuplicateProduct from "../pages/Product/DuplicateProduct/DuplicateProduct";
import UpdateProduct from "../pages/Product/UpdateProduct/UpdateProduct";
import SalesHistory from "../pages/Sales/SalesHistory/SalesHistory";
import SellProduct from "../pages/Sales/SellProduct/SellProduct";
import Welcome from "../pages/Welcome/Welcome";

export const adminRoutes = [
  {
    name: "Welcome",
    path: "welcome",
    element: <Welcome />,
  },
  {
    name: "Product Management",
    children: [
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
    ],
  },
  {
    name: "User Management",
    children: [
      {
        path: "create-manager",
        element: <CreateManager />,
      },
    ],
  },
  {
    name: "Sales Management",
    children: [
      {
        path: "sales-history",
        element: <SalesHistory />,
      },
      {
        path: "sell-product",
        element: <SellProduct />,
      },
    ],
  },
];
