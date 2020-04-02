var gulp            = require('gulp');
var postcss         = require('gulp-postcss');
var autoprefixer    = require('autoprefixer');
var cssImport       = require('postcss-import');
var nested          = require('postcss-nested');
var cssnano = require('cssnano');

var stylelint       = require('stylelint');
var stylelintConfig = require('./stylelintrc.config');
var reporter        = require('postcss-reporter');

var uglify          = require('gulp-uglify');
var rename          = require("gulp-rename");

var plugins = [
    cssImport,
    nested,
    autoprefixer({ overrideBrowserslist: ['last 2 versions', 'ie 6-8', 'Firefox > 20']  }),
    cssnano,
    stylelint(stylelintConfig),
    reporter({
        // Pretty reporting config
        clearMessages: true,
        throwError: true
    }),
];

function style(){
    return gulp.src('source/css/style.css')
    .pipe(postcss(plugins))
    .pipe(gulp.dest('dist/css/'));
}

function pluginsStyle(){ 
    // Only send files
    return gulp.src('source/css/plugins/*.css')
    .pipe(gulp.dest('dist/css/plugins/'));
}

function javascript(){
    return gulp.src(['source/javascript/app.js'])
    .pipe(uglify())
    .pipe(rename('app.js'))
    .pipe(gulp.dest('dist/js/'));
}

function pluginsJavascript(){
    // Only send files
    return gulp.src(['source/javascript/plugins/*.js'])
    .pipe(gulp.dest('dist/js/plugins/'));
}

function images(){
    // Only send files
	return gulp.src('source/images/*')
    .pipe(gulp.dest('dist/img/'));
}

function fonts(){
    // Only send files
	return gulp.src('source/fonts/**/*')
    .pipe(gulp.dest('dist/fonts/'));
}

function pdf(){
    // Only send files
    return gulp.src(['source/pdf/*.*'])
    .pipe(gulp.dest('dist/pdf/'));
}

function watchFiles(){
    gulp.watch('source/css/*.css', style);
    gulp.watch('source/css/plugins/*.css', pluginsStyle);
    gulp.watch('ource/javascript/*.js', javascript);
    gulp.watch('source/javascript/plugins/*.js', pluginsJavascript);
    gulp.watch('source/img/*', images);
    gulp.watch('source/fonts/**/*', fonts);
    gulp.watch('source/pdf/*', pdf);
}

const watch = gulp.series(style, pluginsStyle, javascript, pluginsJavascript, images, fonts, pdf, gulp.parallel(watchFiles));
exports.default = watch;