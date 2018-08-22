import Cookies from "js-cookie";

export function getToken(key = "token") {
  return Cookies.get(key);
}

export function setToken(value, key = "token") {
  return Cookies.set(key, value);
}

export function removeToken(key = "token") {
  return Cookies.remove(key);
}
