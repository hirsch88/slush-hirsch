'use strict';

var gulp       = require('gulp'),
    path       = require('path'),
    gulpConfig = require(process.cwd() + '/gulp.config.js'),
    gulpUtil   = require(process.cwd() + '/gulp.util.js'),
    $          = require('gulp-load-plugins')({lazy: true});

/**
 * Config
 */
gulp.task('config', function () {
  var env = $.util.env.environment || $.util.env.env || 'development';
  var configBase = path.join(gulpConfig.paths.srcDir, gulpConfig.paths.assets.configDir);

  return gulp
    .src(path.join(configBase, env + '.json'))
    .pipe($.rename('config.json'))
    .pipe(gulp.dest(path.join(gulpConfig.paths.srcDir, gulpConfig.paths.assets.configDir)));
});
