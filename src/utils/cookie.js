import Cookies from "js-cookie";

export function getCookie(key = "cookie") {
  return Cookies.get(key);
}

export function saveCookie(value, key = "cookie") {
  return Cookies.set(key, value);
}

export function removeCookie(key = "cookie") {
  return Cookies.remove(key);
}
