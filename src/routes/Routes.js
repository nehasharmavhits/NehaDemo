import React from "react";
import { Routes as Routess, Route } from "react-router-dom";
import Login from "../container/user/auth/Login";
import Register from "../container/user/auth/Register";
import PostList from "../container/user/auth/pages/postList/PostList";
import UserLayout from "../component/user/deafultLayout/UserLayout";
import MyPost from "../container/user/auth/pages/myPost/MyPost";
import ViewPost from "../container/user/auth/pages/viewPost/ViewPost";
import AddPost from "../container/user/auth/pages/addPost/AddPost";
import UserPrivateRoutes from "./UserPrivateRoutes";
import AddComment from "../container/user/auth/pages/comment/AddComment";

const Routes = () => {
  return (
    <>
      <Routess>
        <Route path="/" element={<Login />}></Route>
        <Route path="/user-register" element={<Register />}></Route>
        <Route element={<UserLayout />}>
          <Route element={<UserPrivateRoutes />}>
            <>
              <Route path="/user-post-list" element={<PostList />}></Route>
              <Route path="/user-my-post" element={<MyPost />}></Route>
              <Route path="/user-view-post/:id" element={<ViewPost />}></Route>
              <Route path="/user-add-post" element={<AddPost />}></Route>
              <Route
                path="/user-add-post-comment"
                element={<AddComment />}
              ></Route>
            </>
          </Route>
        </Route>
      </Routess>
    </>
  );
};

export default Routes;
