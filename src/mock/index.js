import Mock from "mockjs";
import loginAPI from "./login";
import InventoryAPI from "./inventory";
// import OrderAPI from "./order";

// const Random = Mock.Random
// Random.domain() //   "nhou.org.cn"
// Random.ip() //  "74.97.41.159"

// 登录相关
Mock.mock(/\/login\/login/, "post", loginAPI.loginByUsername);
Mock.mock(/\/login\/logout/, "post", loginAPI.logout);
Mock.mock(/\/user\/info\.*/, "get", loginAPI.getUserInfo);

//库存
Mock.mock(/\/inventory\/list/, "get", InventoryAPI.getList);
//订单
// Mock.mock(/\/order\/list/, "get", OrderAPI.getList);

export default Mock;
