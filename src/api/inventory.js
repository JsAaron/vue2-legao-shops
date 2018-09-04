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
 * 单独确定收货
 * 商品信息
 * @param {} data
 * http://192.168.1.30/api/goods/acceptgoods?aid=10&shopid=2&storeid=76087-48-08-01&desc=1111
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
    method: "post",
    params: query
  });
}

/**
 * 批量收货
 * @param {}} query
 */
export function acceptGoodsBatch(query) {
  return request({
    url: "goods/acceptgoodsbatch",
    method: "get",
    params: query
  });
}
