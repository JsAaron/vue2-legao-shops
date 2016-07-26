var gulp = require('gulp');

//http://www.browsersync.cn/docs/recipes/
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');

var src = 'app';
var dest = 'f:/project/test/test';

gulp.task('html', function() {
     gulp.src('app/index.html')
        .pipe(gulp.dest(dest))
        .pipe(reload({
            stream: true
        }));
})

gulp.task('js', function() {
    gulp.src('app/*.js')
        .pipe(gulp.dest(dest))
        .pipe(reload({
            stream: true
        }));
})

gulp.task('css', function() {
    gulp.src('app/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(dest))
        .pipe(reload({
            stream: true
        }));
})


// web服务 Server + watching scss/html files
gulp.task('server', ['html', 'css', 'js'], function() {
    browserSync.init({
        server: dest
    });
    gulp.watch('app/index.html', ['html']);
    gulp.watch('app/*.css', ['css']);
    gulp.watch('app/*.js', ['js']);
});

gulp.task('default', ['server'])
