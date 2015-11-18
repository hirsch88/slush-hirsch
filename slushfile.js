/*
 * slush-hirsch
 * https://github.com/hirsch88/slush-hirsch
 *
 * Copyright (c) 2015, hirsch
 * Licensed under the MIT license.
 */
'use strict';
var requireDir = require('require-dir');

/**
 * Scallfold App generatro/task
 */
// requireDir('./app');

/**
 * This are all available generators
 */
requireDir('./component');
requireDir('./service');
requireDir('./filter');
requireDir('./model');
requireDir('./module');
requireDir('./view');

/**
 * The help tasks lists all the generators
 */
var gulp = require('gulp');
var taskListing = require('gulp-task-listing');
gulp.task('help', taskListing);
