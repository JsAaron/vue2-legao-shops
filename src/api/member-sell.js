import request from "@/utils/request";

/**
 * 获取数据列表
 * @param {*} query
 */
export function fetchCards() {
  return request({ url: "card/getlist", method: "post" });
}

//查看电话号码
export function fetchPhone(mobile) {
  return request({
    url: "user/getuser",
    method: "post",
    params: { mobile: mobile }
  });
}
