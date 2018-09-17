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
    method: "get",
    params: query
  });
}
