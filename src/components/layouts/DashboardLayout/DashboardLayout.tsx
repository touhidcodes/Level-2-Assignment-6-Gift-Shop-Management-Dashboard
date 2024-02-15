import { Link, Outlet } from "react-router-dom";
import Headers from "../../shared/Headers/Headers";

const DashboardLayout = () => {
  const sidebarContent = (
    <ul className="menu d-block text-white text-xl rounded-box">
      <li>
        <details>
          <summary>ProductManagement</summary>
          <ul>
            <li>
              <a>
                <Link to="/dashboard/product">All Products</Link>
              </a>
            </li>
            <li>
              <a>
                <Link to="/dashboard/create-product">Create Product</Link>
              </a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details>
          <summary>Sales Management</summary>
          <ul>
            <li>
              <a>
                <Link to="/dashboard/sell-product">Sell Product</Link>
              </a>
            </li>
            <li>
              <a>
                <Link to="/dashboard/sales-history">Sales History</Link>
              </a>
            </li>
          </ul>
        </details>
      </li>
    </ul>
  );
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content ">
        <div className="">
          <Headers />
        </div>
        <div className="flex flex-col items-center justify-center">
          <Outlet />
        </div>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open Dashboard
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <div className="menu p-4 w-80 h-screen  bg-blue-950">
          <div className="text-white text-2xl text-center mt-5">
            <h4> Gift Shop Management</h4>
            <h4 className="mt-2"> Dashboard</h4>
            <hr className="mt-3" />
          </div>
          {sidebarContent}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
