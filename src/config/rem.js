// 实现弹性布局
// 这个函数是为了解决，当进行浏览器窗口大小操作时，rem还是之前的值，如果想要看到效果，需要进行一次手动刷新
// 所以，为了解决不手动刷新我们需要在浏览器窗口变化的时候，进行监听，如果浏览器窗口变化了，就进行rem的重新计算
// （也算是一个bug）
window.onresize = function() {
  rem();
};
rem();
// 进行rem的计算 因为是已1920px为基准进行计算的，所以为了方便，把1rem等于100px
function rem() {
  var whdef = 100 / 1920; // 表示1920的设计图,使用100PX的默认值
  var wH = window.innerHeight; // 当前窗口的高度
  var wW = window.innerWidth; // 当前窗口的宽度
  var rem = wW * whdef; // 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
  document.getElementsByTagName("html")[0].style.fontSize = rem + "px";
}
