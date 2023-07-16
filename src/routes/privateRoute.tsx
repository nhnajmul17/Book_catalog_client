import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hook";

interface IProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
  const { user, isLoading } = useAppSelector((state) => state.auth);

  const { pathname } = useLocation();

  if (isLoading) {
    return (
      <p className="text-center">
        <progress className="progress w-56"></progress>
      </p>
    );
  }

  if (!user.email && !isLoading) {
    return <Navigate to="/login" state={{ path: pathname }} replace />;
  }

  return children;
}
