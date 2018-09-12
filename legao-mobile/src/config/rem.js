// 实现弹性布局
// 这个函数是为了解决，当进行浏览器窗口大小操作时，rem还是之前的值，如果想要看到效果，需要进行一次手动刷新
// 所以，为了解决不手动刷新我们需要在浏览器窗口变化的时候，进行监听，如果浏览器窗口变化了，就进行rem的重新计算
// （也算是一个bug）
window.onresize = function() {
  rem();
};
rem();
function rem() {
  var design = 750; // 表示1920的设计图,使用100PX的默认值
  var innerWidth = window.innerWidth; // 当前窗口的宽度
  var rem = 100 / (design / innerWidth);
  document.getElementsByTagName("html")[0].style.fontSize = rem + "px";
}
