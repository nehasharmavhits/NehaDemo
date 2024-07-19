import axios from "axios";
var baseUrl = process.env.REACT_APP_BASE_URL;

const DataService = axios.create({
  baseURL: baseUrl,
  headers: {
    // "Content-Type": "application/x-www-form-urlencoded",
  },
});

DataService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.auth = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const doGet = async (url) => {
  try {
    const response = await DataService.get(url);
    return response?.data;
  } catch (error) {
    return error;
  }
};
export const doPost = async (url, data) => {
  try {
    const response = await DataService.post(url, data);
    return response?.data;
  } catch (error) {
    return error;
  }
};

export const doGetSingle = async (url, userId) => {
  try {
    const response = await DataService.get(`${url}/${userId}`);
    return response?.data;
  } catch (error) {
    return error;
  }
};

export const doGetQueryData = async (url, data) => {
  try {
    const response = await DataService.get(`${url}?postId=${data}`);
    return response?.data;
  } catch (error) {
    return error;
  }
};

export default DataService;
