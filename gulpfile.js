const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

// Task to compile SCSS to CSS
function estilos() {
    return gulp.src('src/estilos/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('dist/css'));
}

function images() {
    return gulp.src('src/images/*')
        .pipe(gulp.dest('dist/images'));
}

exports.default = gulp.parallel(estilos, images);

    exports.watch = function () {
        gulp.watch("src/estilos/**/*.scss", gulp.parallel(estilos))

    }