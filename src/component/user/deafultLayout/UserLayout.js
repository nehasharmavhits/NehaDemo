import React from "react";
import Index from "../Index";
import Header from "../../admin/defaultLayout/Header";
import { Outlet } from "react-router";


const UserLayout = () => {
  return (
    <Index.Box>
        <Index.Box>
            <Header />
        </Index.Box>
        <Index.Box>
            <Outlet />
        </Index.Box>

    </Index.Box>
  );
};

export default UserLayout;
