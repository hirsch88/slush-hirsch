'use strict';

var gulp = require('gulp');

/**
 * BUILD
 */

gulp.task('build', [
  'config',
  'fonts',
  'index',
  'sass',
  'ts-compile'
]);
