'use strict';

var gulp       = require('gulp'),
    gulpConfig = require(process.cwd() + '/gulp.config.js'),
    gulpUtil   = require(process.cwd() + '/gulp.util.js'),
    path       = require('path'),
    _          = require('lodash'),
    $          = require('gulp-load-plugins')({lazy: true});

/**
 * INSTALL
 * Automatically install npm and bower packages if package.json or
 * bower.json is found in the gulp file stream respectively
 */
gulp.task('install', function (done) {
  gulp
    .src(['./bower.json', './package.json'])
    .pipe($.install())
    .on('end', function () {
      gulp
        .src('./tsd.json')
        .pipe($.tsd())
        .on('end', function () {
          done()
        });
    });

});
