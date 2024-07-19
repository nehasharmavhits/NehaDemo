import { Navigate, Outlet, useNavigate } from "react-router-dom";
import DataService from "../config/DataService";
import { useSelector } from "react-redux";
const UserPrivateRoutes = () => {
  const { token } = useSelector((state) => state.user);

  const isValidToken = (token) => {
    if (!token) return false;
    DataService.defaults.headers.common.auth = token;
    return true;
  };

  return isValidToken(token) ? <Outlet /> : <Navigate to="/" />;
};

export default UserPrivateRoutes;
