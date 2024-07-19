import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  doGet,
  doGetQueryData,
  doGetSingle,
  doPost,
} from "../../../config/DataService";
import Api from "../../../config/Api";

export const userLogin = createAsyncThunk("userLogin", async (data) => {
  try {
    const response = await doPost(Api.USER_LOGIN, data);
    return response;
  } catch (error) {
    return error;
  }
});

export const userRegister = createAsyncThunk("userRegister", async (data) => {
  try {
    const response = await doPost(Api.USER_REGISTER, data);
    return response;
  } catch (error) {
    return error;
  }
});

export const getPost = createAsyncThunk("getPost", async () => {
  try {
    const response = await doGet(Api.GET_POST);
    return response;
  } catch (error) {
    return error;
  }
});

export const myPost = createAsyncThunk("myPost", async () => {
  try {
    const response = await doGet(Api.MY_POST);
    return response;
  } catch (error) {
    return error;
  }
});

export const deletePost = createAsyncThunk("deletePost", async (data) => {
  try {
    const response = await doPost(Api.DELETE_POST, data);
    return response;
  } catch (error) {
    return error;
  }
});

export const addPost = createAsyncThunk("addPost", async (data) => {
  try {
    const response = await doPost(Api.ADD_EDIT_POST, data);
    return response;
  } catch (error) {
    return error;
  }
});

export const viewPost = createAsyncThunk("viewPost", async (data) => {
  try {
    const response = await doGetSingle(Api.VIEW_POST, data);
    return response;
  } catch (error) {
    return error;
  }
});

export const viewPostComment = createAsyncThunk(
  "viewPostComment",
  async (data) => {
    try {
      const response = await doGetQueryData(Api.VIEW_POST_COMMENT, data);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const addPostComment = createAsyncThunk(
  "addPostComment",
  async (data) => {
    try {
      const response = await doPost(Api.ADD_POST_COMMENT, data);
      return response;
    } catch (error) {
      return error;
    }
  }
);
