import axios from "axios";
// import { Message } from "element-ui";
import store from "@/store";

const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // request timeout
});

// 添加一个请求拦截器
service.interceptors.request.use(
  config => {
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    //请求的时候头部带上token
    if (store.getters.cookie) {
      config.headers["userid"] = store.getters.cookie.userid;
      config.headers["token"] = store.getters.cookie.token;
    }
    if (store.getters.shopId) {
      config.params["shopid"] = store.getters.shopId;
    }
    return config;
  },
  error => {
    //请求出错
    console.log("发送错误", error);
    Promise.reject(error);
  }
);

// 添加一个响应拦截器
service.interceptors.response.use(
  response => response,
  // response => {
  //   const res = response.data;
  //   console.log(333333, response);
  //   return response.data;
  // },
  error => {
    console.log("响应错误", error);
    return Promise.reject(error);
  }
);

export default service;
