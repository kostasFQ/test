import { Navigate } from "react-router-dom";

export type PrivatePageWrapperProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
  children: JSX.Element;
};

export default function PrivatePageWrapper({ isAuthenticated, authenticationPath, children }: PrivatePageWrapperProps) {
  return isAuthenticated
    ? children
    : <Navigate to={{ pathname: authenticationPath }} />;
};