const { src, dest, watch, parallel } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const plumber = require('gulp-plumber')
const imagemin = require('gulp-imagemin')
const cache = require('gulp-cache')
const webp = require('gulp-webp')
const avif = require('gulp-avif')

function css(done) {
  src('src/scss/**/*.scss') // Identificando el archivo SASS
  .pipe( plumber() ) // Si tiene problemas, no se detenga
  .pipe( sass() )  // Compilarlo
  .pipe( dest('build/css') ) // Almacenando en el disco duro
 
  done(); // Callback que avisa a gulp cuando llegamos al final
}

function images(done) {
  const options = {
    optimizationLevel: 3
  }

  src('src/img/**/*.{jpg, png}')
  .pipe( cache( imagemin(options) ) )
  .pipe( dest('build/img') )

  done();
}

function versionWebp(done) {
  const options = {
    quality: 50
  }

  src('src/img/**/*.{jpg, png}')
  .pipe( webp(options) )
  .pipe( dest('build/img') )

  done();
}

function versionWebp(done) {
  const options = {
    quality: 50
  }

  src('src/img/**/*.{jpg, png}')
  .pipe( webp(options) )
  .pipe( dest('build/img') )

  done();
}

function versionAvif(done) {
  const options = {
    quality: 50
  }

  src('src/img/**/*.{jpg, png}')
  .pipe( avif(options) )
  .pipe( dest('build/img') )

  done();
}

function dev(done) {           
  watch('src/scss/**/*.scss', css); // Ejecutando la funcion css cuando se detecten cambios en los archivos SASS
 
  done();
}

exports.css = css; // Exportando la funcion css para que gulp la pueda ejecutar con el comando gulp css
exports.images = images;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(images, versionWebp, versionAvif, dev); // Exportando la funcion dev, images, versionWebp y versionAvif