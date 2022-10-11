import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

type Props = {
  children: any;
};
const ProtectedRoute = ({ children }: Props) => {
  const { user } = useAppContext();
  if (!user) {
    return <Navigate to="/landing" />;
  }
  return children;
};
export default ProtectedRoute;
