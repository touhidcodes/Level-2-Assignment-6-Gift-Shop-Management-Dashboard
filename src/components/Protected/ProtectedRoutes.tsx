import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logOut, useCurrentToken } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../../utils/verifyToken";
import { TJWTPayload, TUserRole } from "../../interface/global.interface";

type TProtectedRoute = {
  children: ReactNode;
  roles: TUserRole[] | undefined;
};

type TRoles = {
  roles: TUserRole[];
};

const ProtectedRoutes = ({ children, ...roles }: TProtectedRoute) => {
  console.log(roles.roles);
  const token = useAppSelector(useCurrentToken);
  let user;

  if (token) {
    user = verifyToken(token) as TJWTPayload;
  }

  const dispatch = useAppDispatch();

  if (!roles && roles !== undefined) {
    dispatch(logOut());
    return <Navigate to="/login" replace={true} />;
  }
  if (!roles && !(roles as TRoles)?.roles.includes(user?.role as TUserRole)) {
    dispatch(logOut());
    return <Navigate to="/login" replace={true} />;
  }

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoutes;
