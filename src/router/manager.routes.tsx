import AllCoupons from "../pages/Coupon/AllCoupons/AllCoupons";
import CreateCoupon from "../pages/Coupon/CreateCoupon/CreateCoupon";
import Invoice from "../pages/Invoice/Invoice";
import AllProduct from "../pages/Product/AllProduct/AllProduct";
import CreateProduct from "../pages/Product/CreateProduct/CreateProduct";
import DuplicateProduct from "../pages/Product/DuplicateProduct/DuplicateProduct";
import UpdateProduct from "../pages/Product/UpdateProduct/UpdateProduct";
import SalesHistory from "../pages/Sales/SalesHistory/SalesHistory";
import SellProduct from "../pages/Sales/SellProduct/SellProduct";
import CreateUser from "../pages/User/CreateUser/CreateUser";
import Welcome from "../pages/Welcome/Welcome";

export const managerRoutes = [
  {
    name: "Welcome",
    path: "welcome",
    element: <Welcome />,
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
    name: "Product Management",
    children: [
      {
        name: "All Products",
        path: "product",
        element: <AllProduct />,
      },
      {
        name: "Create Product",
        path: "create-product",
        element: <CreateProduct />,
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
  {
    name: "Coupon Management",
    children: [
      {
        name: "All Coupons",
        path: "coupons",
        element: <AllCoupons />,
      },
      {
        name: "Create Coupon",
        path: "create-coupon",
        element: <CreateCoupon />,
      },
    ],
  },
  {
    path: "invoice",
    element: <Invoice />,
  },
];
