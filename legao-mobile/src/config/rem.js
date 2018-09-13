window.onresize = function() {
  resetRem();
};

resetRem();
function resetRem() {
  let dpr = window.devicePixelRatio || 1;
  let docEl = document.documentElement;
  let design = 750;
  let innerWidth = window.innerWidth;
  let rem = 100 / (design / innerWidth);
  let scale = 1 / dpr;

  // function setBodyFontSize() {
  //   if (document.body) {
  //     document.body.style.fontSize = 12 * dpr + "px";
  //   } else {
  //     document.addEventListener("DOMContentLoaded", setBodyFontSize);
  //   }
  // }
  // setBodyFontSize();

  document.getElementsByTagName("html")[0].style.fontSize = rem + "px";

  // 设置viewport，进行缩放，达到高清效果
  //把visual viewprot设置为实际的layout viewprot 实现1:1 那么1px=1px了
  //再去缩放页面
  let metaEl = document.querySelector('meta[name="viewport"]');
  metaEl.setAttribute(
    "content",
    "width=" +
      innerWidth * dpr +
      ",initial-scale=" +
      scale +
      ",maximum-scale=" +
      scale +
      ", minimum-scale=" +
      scale +
      ",user-scalable=no"
  );

  // // 设置data-dpr属性，留作的css hack之用
  docEl.setAttribute("data-dpr", dpr);

  // window.rem2px = function(v) {
  //   v = parseFloat(v);
  //   return v * rem;
  // };
  // window.px2rem = function(v) {
  //   v = parseFloat(v);
  //   return v / rem;
  // };
  // window.dpr = dpr;
  // window.rem = rem;
}
