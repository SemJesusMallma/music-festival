// CSS
const { src, dest, watch, parallel } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const plumber = require('gulp-plumber')
const autoprefixer = require('autoprefixer')
const postcss = require('gulp-postcss')
const cssnano = require('cssnano')
const sourcemaps = require('gulp-sourcemaps')

// JavaScript

const terser = require('gulp-terser-js')

// Imágenes
const imagemin = require('gulp-imagemin')
const cache = require('gulp-cache')
const webp = require('gulp-webp')
const avif = require('gulp-avif')

function css(done) {
  src('src/scss/**/*.scss') // Identificando el archivo SASS
  .pipe( sourcemaps.init() ) // Inicializando sourcemaps
  .pipe( plumber() ) // Si tiene problemas, no se detenga
  .pipe( sass() )  // Compilarlo
  .pipe( postcss([autoprefixer(), cssnano()]) ) // Agregando prefijos y minificando el CSS
  .pipe( sourcemaps.write('.') ) //Escribiendo los sourcemaps
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

function javascript(done) {
  src('src/js/**/*.js')
  .pipe ( sourcemaps.init() )
  .pipe( terser() )
  .pipe( sourcemaps.write('.') )
  .pipe( dest('build/js') );

  done();
}

function dev(done) {           
  watch('src/scss/**/*.scss', css); // Ejecutando la funcion css cuando se detecten cambios en los archivos SASS
  watch('src/js/**/*.js', javascript);
 
  done();
}

exports.css = css; // Exportando la funcion css para que gulp la pueda ejecutar con el comando gulp css
exports.js = javascript;
exports.images = images;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(images, versionWebp, versionAvif, javascript, dev); // Exportando la funcion dev, images, versionWebp y versionAvif