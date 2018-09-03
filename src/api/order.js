import request from "@/utils/request";

/**
 * 获取数据列表
 * @param {*} query
 */
export function fetchList(query) {
  return request({ url: "/order/list", method: "post", params: query });
}
