import { Link, NavLink } from "react-router-dom";
import { TSidebarItem, TUserPath } from "../interface/route.interface";

export const dashboardItemsGenerator = (items: TUserPath[], role: string) => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: <Link to={`/${role}/${item.path}`}>{item.name}</Link>,
      });
    }

    if (item.children) {
      acc.push({
        key: item.name as string,
        label: item.name,
        children: item.children
          .map((child) => {
            if (child.name) {
              return {
                key: child.name,
                label: (
                  <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
                ),
              };
            }
          })
          .filter(Boolean),
      });
    }

    return acc;
  }, []);

  return sidebarItems;
};
