'use strict';

var gulp       = require('gulp'),
    gulpConfig = require(process.cwd() + '/gulp.config.js'),
    gulpUtil   = require(process.cwd() + '/gulp.util.js'),
    path       = require('path'),
    _          = require('lodash'),
    $          = require('gulp-load-plugins')({lazy: true});


gulp.task('index', ['ts-compile', 'sass'], function () {


  var source = [];
  source.push(path.join(gulpConfig.paths.srcDir, gulpConfig.paths.assets.css));

  _.forEach(gulpUtil.getNgFiles(), function (item) {
    source.push(item);
  });

  var bowerFiles = gulpUtil.getBowerFiles().files.main().filter(function (filePath) {
    return filePath.indexOf(gulpConfig.ignoredBowerFiles) < 0;
  });

  return gulp
    .src(path.join(gulpConfig.paths.srcDir, gulpConfig.paths.mainTpl))
    .pipe($.inject(gulp.src(bowerFiles, {read: false}), {name: 'bower', relative: true}))
    .pipe($.inject(gulp.src(source), {relative: true}))
    .pipe($.rename(gulpConfig.paths.main))
    .pipe($.template(gulpUtil.getPkg()))
    .pipe(gulp.dest(gulpConfig.paths.srcDir));


});
