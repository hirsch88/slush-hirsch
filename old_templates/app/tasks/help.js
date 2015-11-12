'use strict';

var gulp = require('gulp');
var taskListing = require('gulp-task-listing');

/**
 * TASKLISTING
 * List the available gulp tasks
 */
gulp.task('help', taskListing);
