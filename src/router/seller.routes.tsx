import Invoice from "../pages/Invoice/Invoice";
import MySales from "../pages/Sales/MySales/MySales";
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
        name: "My Sales",
        path: "my-sales",
        element: <MySales />,
      },
    ],
  },
  {
    path: "invoice",
    element: <Invoice />,
  },
];
