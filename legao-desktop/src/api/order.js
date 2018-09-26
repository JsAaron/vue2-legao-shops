import request from "@/utils/request";

/**
 * 获取数据列表
 * @param {*} query
 * trades/getlist?pages=1&limit=20&shopid=2
 */
export function fetchList(query) {
  return request({
    url: "trades/getlist",
    method: "post",
    params: query
  });
}

/**
 * 查看详情
 * @param {*} query
 * trades/getlist?pages=1&limit=20&shopid=2
 */
export function viewDetailApi(query) {
  return request({
    url: "trades/info",
    method: "post",
    params: query
  });
}

/**
 * 取消订单
 * http://192.168.1.30/api/trades/canceltrade?tid=E20180817102956005800006&shopid=2&userid=1
 */
export function cancelOrderApi(query) {
  return request({
    url: "trades/canceltrade",
    method: "get",
    params: query
  });
}
