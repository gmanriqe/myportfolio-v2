var gulp = require('gulp');
// var browserSync = require('browser-sync').create();
var autoprefixer = require("gulp-autoprefixer");
var concat = require('gulp-concat'); /* concatenando css */
var cleanCSS = require("gulp-clean-css"); /* minificando y limpiando comentarios css */
var jsmin = require("gulp-jsmin"); /* minifico js */
var rename = require("gulp-rename"); /* renombro archivos */

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

// tarea de nombre "css"
gulp.task("css", function(){
    gulp
        .src([
            "css/menu-animate.css",
            "css/style.css",
            "css/media-queries.css"
        ])
        .pipe(autoprefixer(
            {
                //https://github.com/browserslist/browserslist#full-list
                browsers: ['last 2 versions']
            }
        ))
        .pipe(cleanCSS())
        .pipe(rename("style.min.css"))
        .pipe(concat("style.min.css"))
        .pipe(gulp.dest("css/public/"));
});

// tarea de nombre "js"
gulp.task("js", function(){
    gulp
        .src("./js/app.js")
        .pipe(jsmin())
        .pipe(rename("app.min.js"))
        .pipe(gulp.dest('js/public/'));
});

/** correr todas las tareas */
gulp.task("default", gulp.parallel("css","js"));