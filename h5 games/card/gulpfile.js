var gulp = require('gulp');
var webpack = require('webpack');
var path = require('path');
var notify = require('gulp-notify');
var concat = require('gulp-concat'); //合并文件

// var jshint = require('gulp-jshint');
// var map = require('map-stream');

//http://csspod.com/using-browserify-with-gulp/
// var browserify = require('browserify');
// var source = require('vinyl-source-stream');

//http://www.browsersync.cn/docs/recipes/
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;


//config file
var src   = './src/';
var dest  = './release/';
var index = "index.html";
var config = {
    src: src,
    dest: dest,
    webServer: {
        server    : './release',
        index     : index,
        port      : 3000,
        logLevel  : "debug",
        logPrefix : "Aaron",
        open      : true,
        files     : [dest + "/js/*.js",dest + "/css/*.css", "./index.html"] //监控变化
    },
    css: {
        src: src + '/**/*.css'
    },
    script: {
        entry: {
            'entry': src + '/app.js'
        },
        //输出
        output: {
            path       : dest+"/js", //js位置
            publicPath :  dest+"/js", //web打包的资源地址
            filename   : 'bundle.js'
        },
        sourceMap: true, //源支持
        watch: src + '/**/*.js' //监控脚本
    },
    release: {
        index : dest + index, //主页
        js    : dest + '/**/*.css'
    }
}


// Webpack packaging
var webpackConfig = require('./webpack.config')(config);
gulp.task('scripts', function() {
    webpack(webpackConfig, function(err, stats) {
        if (err) {
            handleErrors();
        }
    });
});


//error prompt
function handleErrors() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: '编译错误',
        message: '<%= error.message %>'
    }).apply(this, args);
    this.emit('end');
};


// web服务 Server + watching scss/html files
gulp.task('web-server', function() {
    browserSync.init(config.webServer);
});



gulp.task('watch', ["scripts", 'web-server'], function() {
    gulp.watch(config.script.watch, ['scripts']);
    gulp.watch(config.css.src, ['scripts']);
    gulp.watch(config.release.index).on('change', reload);
    gulp.watch(config.release.js).on('change', reload);
})

gulp.task('default', ['watch'])



