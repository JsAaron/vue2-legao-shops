var gulp = require('gulp');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

//config file
var dest = './release';
var index = "index.html";
var config = {
    webServer: {
        server: dest,
        index: index,
        port: 3333,
        logLevel: "debug",
        logPrefix: "Aaron",
        open: true
            // files     : [dest + "/js/**.js",dest + "/css/**.css", "*.html"] //监控变化
    },
    release: {
        index: dest + "/" + index, //主页
        js: dest + "/js/**.js",
        css: dest + "/css/**.css"
    }
}



// web服务 Server + watching scss/html files
gulp.task('web-server', function() {
    browserSync.init(config.webServer);
});


gulp.task('watch', ['web-server'], function() {
    // gulp.watch(config.script.watch, ['scripts']);
    // gulp.watch(config.css.src, ['scripts']);
    gulp.watch(config.release.index).on('change', reload);
    gulp.watch(config.release.js).on('change', reload);
    gulp.watch(config.release.css).on('change', reload);
})

gulp.task('default', ['watch'])



// =======================
// 
//  文件操作
// 
// ========================
var fs         = require('fs');
var path       = require('path');
var concat     = require('gulp-concat');
var uglify     = require("gulp-uglify");
var minifyCss  = require("gulp-minify-css");
var minifyHtml = require("gulp-minify-html");

//根路径
var rootPath = process.cwd() + '/release/';

//获取文件名路径
function quick_cloud(page_path) {
    var content = fs.readFileSync(page_path);
    //正则标识符g 表示:reg.exec 会扫描到content最后一个匹配项,直到返回null
    var link_reg = /<link(?:.*?)href=[\"\'](.+?)[\"\'](?!<)(?:.*)\>(?:[\n\r\s]*?)(?:<\/link>)*/gm;
    var js_reg = /<script(?:.*?)src=[\"\'](.+?)[\"\'](?!<)(?:.*)\>(?:[\n\r\s]*?)(?:<\/script>)*/gm;
    var img_reg = /<img(?:.*?[\n\r\s]*.*?)src=[\'\"](.+?)[\'\"](?!<)(?:.*?[\n\r\s]*.*?)\/*>/gm;

    var css_path_arr = [];
    var js_path_arr  = [];

    while (match_link = link_reg.exec(content)) {
        // var obj = {
        //     match: match_link[0],
        //     group: match_link[1]
        // };
        css_path_arr.push(rootPath + match_link[1]);
    };

    // console.log(link_search_arr);

    //解析出JS
    while (match_js = js_reg.exec(content)) {
        // var obj = {
        //     match: match_js[0],
        //     group: match_js[1]
        // };
        js_path_arr.push(rootPath + match_js[1] );
    }

    return {
        css : css_path_arr,
        js  : js_path_arr
    }
    // console.log(js_search_arr);
}


gulp.task('script', function () {
    var indexFile = process.cwd() + '/release/index.html'
    //分析index获取路径
    var path = quick_cloud(indexFile)
    gulp.src(path.js)
        .pipe(concat('all.js'))
        .pipe(uglify())  
        .pipe(gulp.dest('./dist/'));
});


gulp.task('css', function () {
    var indexFile = process.cwd() + '/release/index.html'
    //分析index获取路径
    var path = quick_cloud(indexFile)
    gulp.src(path.css)
        .pipe(concat('all.css'))
        .pipe(minifyCss())  
        .pipe(gulp.dest('./dist/'));
});


gulp.task('html', function () {
    gulp.src(process.cwd() + '/release/index.html')
        .pipe(minifyHtml())  
        .pipe(gulp.dest('./dist/'));
});

/**
 * 打包
 * @param  {[type]} ){} [description]
 * @return {[type]}       [description]
 */
gulp.task('builder', function() {
    gulp.start('script', 'css');
})



function test() {

    var stdin = process.stdin,
        stdout = process.stdout;
    var stats = [];

    var rootPath = process.cwd() + '/release/'

    fs.readdir(rootPath, function(err, files) {
        console.log(' ');

        if (!files.length) {
            return console.log(' \033[31m No files to show!\033[39m\n');
        }

        stdout.write(' \033[33m根目录 : \033[39m\n');

        function file(i) {

            //目录名
            var filename = files[i];

            //查看文件与目录的信息
            fs.stat(rootPath + '/' + filename, function(err, stat) {
                stats[i] = stat;
                //如果是目录
                if (stat.isDirectory()) {
                    console.log(' ' + i + ' \033[36m' + filename + '/\033[39m');
                } else {
                    console.log(' ' + i + ' \033[90m' + filename + '\033[39m');
                }
                i++;
                if (i == files.length) {
                    read();
                } else {
                    file(i);
                }
            });
        }

        function read() {
            console.log(' ');
            stdout.write(' \033[33m选择要压缩的子目录 : \033[39m');
            stdin.resume();
            stdin.setEncoding('utf8');
            stdin.on('data', option);
        }

        function option(data) {
            var filename = files[Number(data)];
            if (!files[Number(data)]) {
                stdout.write(' \033[mEnter your choice : \033[39m');
            } else if (stats[Number(data)].isDirectory()) {
                fs.readdir(rootPath + '/' + filename, function(err, files) {
                    console.log(' ');
                    console.log(' (' + files.length + 'files)');

                    var jsArr = []

                    files.forEach(function(file) {
                        jsArr.push(rootPath + '/' + filename + '/' + file)
                    });

                    jsMinifier(jsArr, './test-min.js'); //合并压缩

                    console.log(' ', files);
                });
            } else {
                stdin.pause();
                fs.readFile(__dirname + '/' + filename, 'utf8', function(err, data) {
                    console.log(' ');
                    console.log('\033[90m' + data.replace(/(.*) /g, ' $1') + '\033[39m');
                });
            }
        }

        file(0);
    });

}
