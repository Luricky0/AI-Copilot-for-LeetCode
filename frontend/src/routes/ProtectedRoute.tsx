import React from "react";
import LoginPortal from "../components/LoginPortal";
import useUser from "../hooks/useUser";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useUser();
  return token ? <>{children}</> : <LoginPortal />;
};