/*
 * slush-hirsch
 * https://github.com/hirsch88/slush-hirsch
 *
 * Copyright (c) 2015, hirsch
 * Licensed under the MIT license.
 */

'use strict';

var requireDir = require('require-dir');
requireDir('./service');
requireDir('./filter');
requireDir('./model');

/**
 * The help tasks lists all the generators
*/
var gulp = require('gulp');
var taskListing = require('gulp-task-listing');
gulp.task('help', taskListing);
