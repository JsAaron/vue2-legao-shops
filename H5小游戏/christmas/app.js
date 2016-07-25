var gulp = require('gulp');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

//config file
var dest  = './release';
var index = "index.html";
var config = {
    dest: dest,
    webServer: {
        server    : dest,
        index     : index,
        port      : 3000,
        logLevel  : "debug",
        logPrefix : "Aaron",
        open      : true,
        files     : [dest + "/js/*.js",dest + "/css/*.css", "./index.html"] //监控变化
    },
    release: {
        index : dest + index, //主页
        js    : dest + '/**/*.css'
    }
}



gulp.task('default', function() {
    browserSync.init(config.webServer);
})


