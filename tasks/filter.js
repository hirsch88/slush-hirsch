/**
 * FILTER
 * -------------------------------------------------------------
 *
 * This task scaffolds a TypeScript Model
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

gulp.task('filter', function (done) {
  var prompts = [{
    name: 'name',
    message: 'What is the name of your filter?'
  }];

  //Ask
  inquirer.prompt(prompts, function (answers) {
    util.modulePrompt(function (module) {
      util.folderPrompt('filters', function (folder) {
        var p = util.getPaths('filter', ['ts']);
        var context = util.buildContext([answers, folder]);
        var fileName = context.camelizedName + '.filter.ts';
        var target = path.join(p.target, module, context.path);
        context.module = module;
        gulp.src(p.source)
          .pipe(template(context))
          .pipe(rename(fileName))
          .pipe(conflict(target))
          .pipe(gulp.dest(target))
          .on('end', function () {
            util.createServiceModule(target, context, function () {
              done();
              util.onSuccess('Filter', path.join(target, fileName));
            });
          });
      });
    });
  });
});
