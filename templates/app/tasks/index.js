'use strict';

var gulp       = require('gulp'),
    gulpConfig = require(process.cwd() + '/gulp.config.js'),
    gulpUtil   = require(process.cwd() + '/gulp.util.js'),
    path       = require('path'),
    _          = require('lodash'),
    $          = require('gulp-load-plugins')({lazy: true});

gulp.task('index', ['ts-compile', 'sass'], function (done) {
  gulpUtil.buildIndex(done);
});

gulp.task('index-serve', function (done) {
  gulpUtil.buildIndex(done);
});

gulp.task('ts-serve', ['ts-compile'], function (done) {
  gulpUtil.buildIndex(done);
});

gulp.task('sass-serve', ['sass'], function (done) {
  gulpUtil.buildIndex(done);
});


