import { Outlet } from "react-router-dom";
import Headers from "../../shared/Headers/Headers";

const MainLayout = () => {
  return (
    <div>
      <Headers />
      <div className="max-w-screen-xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
