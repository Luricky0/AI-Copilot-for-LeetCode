import React from "react";
import LoginPortal from "../components/LoginPortal";
import { useUserContext } from "../contexts/userContext";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useUserContext();
  return token ? <>{children}</> : <LoginPortal />;
};