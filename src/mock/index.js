import Mock from "mockjs";
import loginAPI from "./login";

// const Random = Mock.Random
// Random.domain() //   "nhou.org.cn"
// Random.ip() //  "74.97.41.159"

// 登录相关
Mock.mock(/\/login\/login/, "post", loginAPI.loginByUsername);
Mock.mock(/\/login\/logout/, "post", loginAPI.logout);
Mock.mock(/\/user\/info\.*/, "get", loginAPI.getUserInfo);

export default Mock;
