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

gulp.task('routes', function (done) {
  var prompts = [{
    name: 'name',
    message: 'What is the url of your state?'
  }];
  //Ask
  inquirer.prompt(prompts, function (answers) {
    util.modulePrompt(function (module) {
      util.folderPrompt('routes', function (folder) {
        var p = util.getPaths('./', ['ts']);
        var context = util.buildContext([answers, folder]);
        var fileName = folder.namespace + '.routes.ts';
        var target = path.join(p.target, module);
        context.module = module;
        gulp.src(p.source)
          .pipe(template(context))
          .pipe(rename(fileName))
          .pipe(conflict(target))
          .pipe(gulp.dest(target))
          .on('end', function () {
            done();
            util.onSuccess('Routes', path.join(target, fileName));
          });
      });
    });
  });
});
