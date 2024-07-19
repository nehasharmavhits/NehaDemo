import React from "react";
import Index from "../../user/Index";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slice/user/UserSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogOut = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <Index.Box className="header-main">
      <Index.Box className="header-nav-main">
        <Index.Box className="image-logo">
          <h1>Blog</h1>
        </Index.Box>
        <Index.Box className="header-nav-main">
          <Link to="/user-post-list" className="header-nav">
            <Index.Typography
              variant="body1"
              component="p"
              className={`${
                location?.pathname == "/user-post-list"
                  ? "active"
                  : "header-nav-lable"
              }`}
            >
              Blogs
            </Index.Typography>
          </Link>
          <Link to="/user-my-post">
            <Index.Typography
              variant="body1"
              component="p"
              className={`${
                location?.pathname == "/user-my-post"
                  ? "active"
                  : "header-nav-lable"
              }`}
            >
              My Blogs
            </Index.Typography>
          </Link>
          <Link to="/user-add-post">
            <Index.Typography
              variant="body1"
              component="p"
              className={`${
                location?.pathname == "/user-add-post"
                  ? "active"
                  : "header-nav-lable"
              }`}
            >
              Add Blogs
            </Index.Typography>
          </Link>
        </Index.Box>
      </Index.Box>

      <Index.Box className="header-nav-main">
        <Index.Button onClick={handleLogOut}>LogOut</Index.Button>
      </Index.Box>
    </Index.Box>
  );
};

export default Header;
