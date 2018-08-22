import request from "@/utils/request";

export function loginByUsername(username, password) {
  return request({
    url: "/admin/login",
    method: "post",
    params: { user: username, psw: password }
  });
}

export function logout() {
  return request({
    url: "/login/logout",
    method: "post"
  });
}

/**
 * token存在，处理
 * @param {*} userid
 * @param {*} token
 */
export function getUserInfo() {
  return request({
    url: "/admin/token",
    method: "POST"
  });
}
