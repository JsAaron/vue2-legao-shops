import request from "@/utils/request";

/**
 * 获取数据列表
 * @param {*} query
 * goods/getpages?pages=0&pagesize=10
 */
export function fetchList(query) {
  return request({
    // url: "/inventory/list",
    url: "/goods/getpages",
    method: "get",
    params: query
  });
}
