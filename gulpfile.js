const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const { exec } = require('child_process');

// Task to compile SCSS to CSS
function estilos() {
    return gulp.src('src/estilos/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('dist/css'));
}

//  TAREFA: Comprimir imagens com Sharp via compressor.js
function compressImages(done) {
exec('node ./src/js/compressor.js', (err, stdout, stderr) => {
    if (err) {
    console.error(`Erro: ${stderr}`);
    } else {
    console.log(stdout);
    }
    done();
});
}

const svgmin = require('gulp-svgmin');

function compressSVGs() {
return gulp.src('./src/images/**/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('./dist/images'));
}


exports.default = gulp.parallel(estilos, compressImages, compressSVGs);

    exports.watch = function () {
        gulp.watch("src/estilos/**/*.scss", gulp.parallel(estilos));
        gulp.watch("src/images/**/*", gulp.parallel(compressImages))
        gulp.watch("src/images/**/*.svg", gulp.parallel(compressSVGs))
    }