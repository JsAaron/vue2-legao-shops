import request from "@/utils/request";

/**
 * 获取数据列表
 * @param {*} query
 */
export function fetchList(query) {
  return request({ url: "cardinfo/getlist", method: "post", params: query });
}

/**
 * 会员个人管理
 * http://192.168.1.30/api/cardinfo/info?card_no=338541921295302120
 */
export function fetchPersonal(query) {
  return request({ url: "cardinfo/info", method: "post", params: query });
}

/**
 * 更新日期
 * cardinfo/updateendtime?card_no=&endtime&shopid
 */
export function fetchUpateDate(query) {
  return request({
    url: "cardinfo/updateendtime",
    method: "post",
    params: query
  });
}
