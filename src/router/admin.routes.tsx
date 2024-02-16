import AllProduct from "../pages/Product/AllProduct/AllProduct";
import CreateProduct from "../pages/Product/CreateProduct/CreateProduct";
import DuplicateProduct from "../pages/Product/DuplicateProduct/DuplicateProduct";
import UpdateProduct from "../pages/Product/UpdateProduct/UpdateProduct";
import SalesHistory from "../pages/Sales/SalesHistory/SalesHistory";
import SellProduct from "../pages/Sales/SellProduct/SellProduct";
import CreateUser from "../pages/User/CreateUser/CreateUser";
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
        name: "Create Product",
        path: "create-product",
        element: <CreateProduct />,
      },
      {
        name: "All Products",
        path: "product",
        element: <AllProduct />,
      },
      {
        name: "Duplicate Product",
        path: "product/duplicate",
        element: <DuplicateProduct />,
      },
      {
        name: "Update Product",
        path: "product/:productId",
        element: <UpdateProduct />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create User",
        path: "create-user",
        element: <CreateUser />,
      },
    ],
  },
  {
    name: "Sales Management",
    children: [
      {
        name: "Sell Product",
        path: "sell-product",
        element: <SellProduct />,
      },
      {
        name: "Sales History",
        path: "sales-history",
        element: <SalesHistory />,
      },
    ],
  },
];
