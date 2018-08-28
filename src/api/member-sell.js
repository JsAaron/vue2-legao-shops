import request from "@/utils/request";

/**
 * 获取数据列表
 * @param {*} query
 */
export function fetchCards() {
  return request({ url: "card/getlist", method: "get" });
}
