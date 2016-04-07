'use strict'

const gulp = require('gulp')
const browserify = require('browserify')
const concat = require('gulp-concat')
const clean = require('gulp-clean')
const source = require('vinyl-source-stream')
const fs = require('fs')

const DEST = './dist'
let SWAGGER_UI_DIST_PATH = './node_modules/swagger-ui-browserify/node_modules/swagger-ui/dist'

if (!fs.existsSync(SWAGGER_UI_DIST_PATH)) {
  // npm 3+
  SWAGGER_UI_DIST_PATH = './node_modules/swagger-ui/dist'
}

gulp.task('clean', () => {
  return gulp.src(DEST, {
    read: false
  })
    .pipe(clean())
})

gulp.task('browserify', () => {
  return browserify({
    entries: ['./lib/app.js']
  })
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest(DEST + '/js'))
})

gulp.task('html', () => {
  return gulp.src([
    './public/**'
  ])
    .pipe(gulp.dest(DEST))
})

gulp.task('fonts', () => {
  return gulp.src([
    SWAGGER_UI_DIST_PATH + '/fonts/*.{eot,svg,ttf,woff,woff2}'
  ])
    .pipe(gulp.dest(DEST + '/fonts'))
})

gulp.task('css-print', () => {
  return gulp.src([
    SWAGGER_UI_DIST_PATH + '/css/reset.css',
    SWAGGER_UI_DIST_PATH + '/css/print.css',
    SWAGGER_UI_DIST_PATH + '/css/typography.css'
  ])
    .pipe(concat('app-print.css'))
    .pipe(gulp.dest(DEST + '/css'))
})

gulp.task('css', ['css-print'], () => {
  return gulp.src([
    SWAGGER_UI_DIST_PATH + '/css/reset.css',
    SWAGGER_UI_DIST_PATH + '/css/screen.css',
    SWAGGER_UI_DIST_PATH + '/css/typography.css'
  ])
    .pipe(concat('app.css'))
    .pipe(gulp.dest(DEST + '/css'))
})

gulp.task('images', () => {
  return gulp.src([
    SWAGGER_UI_DIST_PATH + '/images/*.{png,jpg,gif}'
  ])
    .pipe(gulp.dest(DEST + '/images'))
})

gulp.task('default', ['browserify', 'html', 'css', 'fonts', 'images'])
