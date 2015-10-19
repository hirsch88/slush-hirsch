/**
 * MODULE
 * -------------------------------------------------------------
 *
 * This task scaffolds a TypeScript AngularJS Module
 */
'use strict';

var gulp     = require('gulp'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename   = require('gulp-rename'),
    _        = require('underscore.string'),
    inquirer = require('inquirer'),
    path     = require('path');

var util = require('../util.js');

gulp.task('module', function (done) {
  var prompts = [{
    name: 'name',
    message: 'What is the name of your module?'
  }];
  //Ask
  inquirer.prompt(prompts, function (answers) {
    util.folderPrompt(answers.name, function (folder) {
      var p = util.getPaths('module');
      var context = util.buildContext([answers, folder]);
      var fileName = '_' + context.capitalizedName + 'Module.ts';
      var target = path.join(p.target, context.path);
      gulp.src(p.source)
        .pipe(template(context))
        .pipe(rename(fileName))
        .pipe(conflict(target))
        .pipe(gulp.dest(target))
        .on('end', function () {
          done();
          util.onSuccess('Module', path.join(target, fileName));
        });
    });
  });
});