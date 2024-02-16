import SalesHistory from "../pages/Sales/SalesHistory/SalesHistory";
import SellProduct from "../pages/Sales/SellProduct/SellProduct";

export const sellerRoutes = [
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
