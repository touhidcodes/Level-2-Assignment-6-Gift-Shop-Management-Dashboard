import SalesHistory from "../pages/Sales/SalesHistory/SalesHistory";
import SellProduct from "../pages/Sales/SellProduct/SellProduct";
import Welcome from "../pages/Welcome/Welcome";

export const sellerRoutes = [
  {
    name: "Welcome",
    path: "welcome",
    element: <Welcome />,
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
        name: "My Sales History",
        path: "sales-history",
        element: <SalesHistory />,
      },
    ],
  },
];
