/**
 * SERVICE
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

gulp.task('service', function (done) {
  var prompts = [{
    name: 'name',
    message: 'What is the name of your service?'
  }];
  //Ask
  inquirer.prompt(prompts, function (answers) {
    util.modulePrompt(function (module) {
      util.folderPrompt('services', function (folder) {
        var p = util.getPaths('service', ['ts']);
        var context = util.buildContext([answers, folder]);
        var fileName = context.camelizedName + '.service.ts';
        var target = path.join(p.target, module, context.path);
        context.module = module;
        gulp.src(p.source)
          .pipe(template(context))
          .pipe(rename(fileName))
          .pipe(conflict(target))
          .pipe(gulp.dest(target))
          .on('end', function () {
            done();
            util.onSuccess('Service', path.join(target, fileName));
          });
      });
    });
  });
});
