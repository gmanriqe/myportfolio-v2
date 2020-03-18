var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var browserslist= require('browserslist');
var autoprefixer = require("gulp-autoprefixer");
var concat = require('gulp-concat'); /* concatenando css */
var cleanCSS = require("gulp-clean-css"); /* minificando y limpiando comentarios css */
var jsmin = require("gulp-jsmin"); /* minifico js */
var rename = require("gulp-rename"); /* renombro archivos */

function style(){
    return gulp.src([
            "css/menu-animate.css",
            "css/style.css",
            "css/media-queries.css"
        ])
        .pipe(autoprefixer(
            {
                'overrideBrowserslist': ['last 2 versions'] //https://github.com/browserslist/browserslist#full-list
            }
        ))
        .pipe(cleanCSS())
        .pipe(rename("style.min.css"))
        .pipe(concat("style.min.css"))
        .pipe(gulp.dest("css/public/"))
        .pipe(browserSync.stream());
}

function javascript(){
    return gulp.src("./js/app.js")
        .pipe(jsmin())
        .pipe(rename("app.min.js"))
        .pipe(gulp.dest('js/public/'))
        .pipe(browserSync.stream());
}

function watchFiles() {
    gulp.watch('css/style.css', style);
    gulp.watch('js/app.js', javascript);
    gulp.watch('*.html').on('change', browserSync.reload);
}

function browser() {

    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 8080
    });
}

const watch = gulp.series(style, javascript, gulp.parallel(watchFiles, browser));
exports.default = watch;

// Save a reference to the `reload` method
// Watch scss AND html files, doing different things with each.
// gulp.task('serve', function () {

//     browserSync.init({
//         server: {
//             baseDir: "./"
//         },
//         port: 8080
//     });

//     gulp.watch("*.html").on("change", browserSync.reload);
//     gulp.watch("./css/style.css").on("change", browserSync.reload);
//     gulp.watch("./js/app.js").on("change", browserSync.reload);
// });


/** correr todas las tareas */
// gulp.task("default", gulp.parallel("css","js"));