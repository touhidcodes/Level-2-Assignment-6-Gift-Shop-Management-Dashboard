import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logOut, useCurrentToken } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../../utils/verifyToken";
import { TJWTPayload, TUserRole } from "../../interface/global.interface";

type TProtectedRoute = {
  children: ReactNode;
  role: TUserRole | undefined;
};

const ProtectedRoutes = ({ children, role }: TProtectedRoute) => {
  console.log(role);
  const token = useAppSelector(useCurrentToken);
  let user;

  if (token) {
    user = verifyToken(token) as TJWTPayload;
  }

  const dispatch = useAppDispatch();

  if (role !== undefined && role !== user?.role) {
    dispatch(logOut());
    return <Navigate to="/login" replace={true} />;
  }

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoutes;
