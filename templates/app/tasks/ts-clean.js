'use strict';

var gulp       = require('gulp'),
    gulpConfig = require(process.cwd() + '/gulp.config.js'),
    gulpUtil   = require(process.cwd() + '/gulp.util.js'),
    del        = require('del');

/**
 * CLEAN
 */
gulp.task('ts-clean', function (cb) {
  del([
    gulpConfig.paths.srcDir + '/' + gulpConfig.paths.appDir + '/**/*.js',
    gulpConfig.paths.srcDir + '/' + gulpConfig.paths.appDir + '/**/*.js.map'
  ], cb);
});
