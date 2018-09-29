import request from "@/utils/request";

/**
 * http://192.168.1.30/api/payorder/getlist?shopid=2&pages=1&limit=10
 * @param {*} username
 * @param {*} password
 */
export function fetchList(query) {
  return request({
    url: "/payorder/getlist",
    method: "get",
    params: query
  });
}
