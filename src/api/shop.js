import request from "@/utils/request";

/**
 * 获取数据列表
 * @param {*} query
 */
export function fetchList(query) {
  return request({
    url: "/admin/getlist",
    method: "get",
    params: query
  });
}

export function chagePassword(query) {
  return request({
    url: "/admin/modifypsw",
    method: "post",
    params: query
  });
}
