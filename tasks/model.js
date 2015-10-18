/**
 * DEFAULT
 * -------------------------------------------------------------
 *
 * This task scaffolds a TypeScript AngularJS App
 */
'use strict';

var gulp     = require('gulp'),
    install  = require('gulp-install'),
    tsd      = require('gulp-tsd'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename   = require('gulp-rename'),
    _        = require('underscore.string'),
    inquirer = require('inquirer'),
    path     = require('path');

var util = require('../util.js');
var defaults = util.defaults();

gulp.task('model', function (done) {
  var prompts = [

  ];
  //Ask
  inquirer.prompt(prompts,
    function (answers) {


      done();
    });
});