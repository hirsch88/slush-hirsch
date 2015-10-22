'use strict';

var gulp       = require('gulp'),
    gulpConfig = require(process.cwd() + '/gulp.config.js'),
    gulpUtil   = require(process.cwd() + '/gulp.util.js'),
    $          = require('gulp-load-plugins')({lazy: true});

/**
 * TSLINT
 * Lints all .ts source files in the app.
 */
gulp.task('ts-lint', function () {
  return gulp.src([
    gulpConfig.paths.srcDir + '/' + gulpConfig.paths.app.scripts.replace(/\.js$/, '.ts')
  ])
    .pipe($.tslint())
    .pipe($.tslint.report('verbose'));
});
