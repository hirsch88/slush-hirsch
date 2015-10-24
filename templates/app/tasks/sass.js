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

gulp.task('sass', function (done) {

  var mainSassFile = path.join(gulpConfig.paths.srcDir, gulpConfig.paths.assets.sassMain);
  var mainCssDir = path.join(gulpConfig.paths.srcDir, gulpConfig.paths.assets.cssDir);
  var cssFile = gulpUtil.getPkg().name + '.css';

  gulp
    .src(mainSassFile)
    .pipe($.sourcemaps.init())
    .pipe($.plumber())
    .pipe($.sass.sync().on('error', function (error) {
      var m = error.message.split('\n');
      gulpUtil.onError('[ SASS ] ' + m[0] + ':' + m[1]);
      gulpUtil.errors.sass.push('<i>' + m[0] + ':</i>' + m[1]);
    }))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe($.sourcemaps.write())
    .pipe($.rename(cssFile))
    .pipe(gulp.dest(mainCssDir))
    .on('end', function () {
      if (gulpUtil.errors.sass.length === 0) {
        done();
      } else {
        gulpUtil.buildErrorReporting(gulpUtil.errors, done);
      }
    });

});
