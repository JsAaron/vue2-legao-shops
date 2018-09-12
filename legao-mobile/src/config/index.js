/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl = "";
let routerMode = "history";
let imgBaseUrl = "";
let mock = true; //启动mock配置

if (process.env.NODE_ENV == "development") {
  imgBaseUrl = "/img/";
} else if (process.env.NODE_ENV == "production") {
  baseUrl = "//elm.cangdu.org";
  imgBaseUrl = "//elm.cangdu.org/img/";
}

export { mock, baseUrl, routerMode, imgBaseUrl };
