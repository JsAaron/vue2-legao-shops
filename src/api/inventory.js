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
 * 收货
 * 商品信息
 * @param {} data
 */
export function acceptGoods(query) {
  return request({
    url: "goods/acceptgoods",
    method: "post",
    params: query
  });
}

/**
 * 管理
 * 修改库存状态
 * @param {}} query
 */
export function modifyExtflag(query) {
  return request({
    url: "goods/modifyextflag",
    method: "get",
    params: query
  });
}
