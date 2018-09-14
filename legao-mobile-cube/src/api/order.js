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
