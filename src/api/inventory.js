import request from "@/utils/request";

/**
 * 获取数据列表
 * @param {*} query
 * goods/getpages?pages=0&pagesize=10
 */
export function fetchList(query) {
  return request({
    url: "/goods/getpages",
    method: "get",
    params: query
  });
}

/**
 * 更新库存状态
 * 功能管理
 * @param {} data
 */
export function updateInventory(query) {
  return request({
    url: "goods/acceptgoods",
    method: "post",
    params: query
  });
}
