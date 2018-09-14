// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: {
    //两个主要是用于处理引入的文件和资源路径的处理以及工作模式。如果你的项目也使用的是Vue，
    //并且配置了vue-loader，并且配置了相关的参数，那就就具有类似的功能
    "postcss-import": {},
    "postcss-url": {},
    // autoprefixer: {}
    "postcss-aspect-ratio-mini": {},
    "postcss-write-svg": { utf8: false },
    //使用CSS未来的特性
    "postcss-cssnext": {},
    //用来把px单位转换为vw、vh、vmin或者vmax这样的视窗单位
    "postcss-px-to-viewport": {
      viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: "vw", // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: [".ignore", ".hairlines"], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false // 允许在媒体查询中转换`px`
    },
    "postcss-viewport-units": {},
    //压缩和清理CSS代码
    cssnano: {
      preset: "advanced",
      autoprefixer: false, //postcss-cssnext有同样功能
      "postcss-zindex": false
    }
  }
};
