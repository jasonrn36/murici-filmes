const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const { exec } = require('child_process');

// Compilar SCSS
function estilos() {
    return gulp.src('src/estilos/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
}

//CallBack no Estilos
gulp.task('estilos', function(done) {
    done();
    });

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

function copyHTML() {
    return gulp.src('./*.html')
    .pipe(gulp.dest('dist'));
}

function copyJS() {
    return gulp.src('./src/js/*.js')
    .pipe(gulp.dest('./dist/js'));
}


const svgmin = require('gulp-svgmin');

function compressSVG() {
return gulp.src('./src/images/**/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('./dist/images'));
}

// função do faficon logo
function copyFavicon() {
    return gulp.src('./src/images/favicon.png')
    .pipe(gulp.dest('./dist'));
}


exports.default = gulp.parallel(estilos, compressImages, compressSVG, copyHTML, copyJS, copyFavicon);

    exports.watch = function () {
        gulp.watch("src/estilos/**/*.scss", gulp.parallel(estilos));
        gulp.watch("src/images/**/*", gulp.parallel(compressImages));
        gulp.watch("src/images/**/*.svg", gulp.parallel(compressSVG));
        gulp.watch("./*.html", gulp.parallel(copyHTML));
        gulp.watch("src/js/*.js", gulp.parallel(copyJS));
    }