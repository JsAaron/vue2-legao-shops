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
 * 更新商品库存数据
 * @param {} data
 */
export function updateInventory(query) {
  return request({
    url: "/goods/update",
    method: "post",
    params: query
  });
}
