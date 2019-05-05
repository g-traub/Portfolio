const prod = process.env.NODE_ENV === 'prod';
const { series, parallel, watch, src, dest } = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const gulpif = require('gulp-if');
const pxtorem = require('gulp-pxtorem');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync');
const del = require('del');

const server = browserSync.create();
const clean = () => del(['dist']);

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: './dist',
      index: "index.html"
    }
  });
  done();
}

function html(){
  return src(['./src/html/*.html', './src/html/projects/*.html'], {base: './src/html/'})
  .pipe(dest('dist/'))
}

function css() {
  return src('./src/scss/*.scss')
  .pipe(sass())
  .pipe(pxtorem({proplist:['*']}))
  .pipe(gulpif(prod,autoprefixer({
    browsers: ['last 2 versions']
})))
  .pipe(gulpif(prod,cssnano()))
  .pipe(dest('dist/css'))
}

function mainjs() {
  return src(['./src/JS/lib/*.js','./src/JS/main.js'])
  .pipe(concat('all.js'))
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(uglify())
  .pipe(dest('dist/js'))
}
function otherjs() {
  return src(['./src/JS/project.js','./src/JS/size.js'])
  .pipe(concat('project.js'))
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(uglify())
  .pipe(dest('dist/js'))
}

function assets() {
  return src(['./src/assets/fonts/*.*', './src/assets/img/*.*', './src/assets/video/*.*'], {base: './src/assets/'})
  .pipe(dest('dist/assets'))
}

const watcher = () => watch('src/**/*.*', series(html, css, mainjs, otherjs, reload));

exports.dev = series(clean, html, css, mainjs, otherjs, assets, serve, watcher);
exports.build = series(html, css, mainjs, otherjs, assets);