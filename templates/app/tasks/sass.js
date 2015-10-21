'use strict';

var gulp        = require('gulp'),
    gulpConfig  = require(process.cwd() + '/gulp.config.js'),
    gulpUtil    = require(process.cwd() + '/gulp.util.js'),
    $           = require('gulp-load-plugins')({lazy: true}),
    path        = require('path'),
    browserSync = require('browser-sync');
var reload = browserSync.reload;

/**
 * SASS
 * Generates a new css file from our sass files
 */

gulp.task('sass', function () {

  var mainSassFile = path.join(gulpConfig.paths.srcDir, gulpConfig.paths.assets.sassMain);
  var mainCssDir = path.join(gulpConfig.paths.srcDir, gulpConfig.paths.assets.cssDir);
  var cssFile = gulpUtil.getPkg().name + '.css';

  return gulp
    .src(mainSassFile)
    .pipe($.sourcemaps.init())
    .pipe($.plumber())
    .pipe($.sass.sync().on('error', $.sass.logError))
    .pipe($.sourcemaps.write())
    .pipe($.rename(cssFile))
    .pipe(gulp.dest(mainCssDir))
    .pipe(reload({stream: true}));

});
