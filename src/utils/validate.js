/**
 * Created by jiachenpan on 16/11/18.
 */
function check_other_char(str) {
  var arr = ["&", "\\", "/", "*", ">", "<", "@", "!"];
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < str.length; j++) {
      if (arr[i] == str.charAt(j)) {
        return true;
      }
    }
  }
  return false;
}

// 手机号验证
export function isValidPhone(str) {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
  return reg.test(str);
}

//校验密码：只能输入6-20个字母、数字、下划线
export function isPasswd(s) {
  var patrn = /^(\w){6,20}$/;
  if (!patrn.exec(s)) return false;
  return true;
}

export function isvalidUsername(str) {
  var str2 = "";
  if ("" == str) {
    str2 = "用户名为空";
    return str2;
  } else if (str.length < 5 || str.length > 20) {
    str2 = "用户名必须为5 ~ 20位";
    return str2;
  } else if (check_other_char(str)) {
    str2 = "不能含有特殊字符";
    return str2;
  }
  return str2;
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(textval);
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/* 大小写字母*/
export function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
