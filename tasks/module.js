/**
 * MODULE
 * -------------------------------------------------------------
 *
 * This task scaffolds a TypeScript AngularJS Module
 */
'use strict';

var gulp = require('gulp'),
  conflict = require('gulp-conflict'),
  template = require('gulp-template'),
  rename = require('gulp-rename'),
  _ = require('underscore.string'),
  inquirer = require('inquirer'),
  path = require('path');

var util = require('../util.js');

gulp.task('module', function (done) {
  var prompts = [
    {
      name: 'name',
      message: 'What is the name of your module?'
    }, {
      name: 'description',
      message: 'Please describe your new model:'
    }
  ];
  //Ask
  inquirer.prompt(prompts, function (answers) {
    util.folderPrompt(answers.name, function (folder) {
      util.getGitConfig(function (gitConfig) {

        var p = util.getPaths('Module', ['ts']);
        var context = util.buildContext([answers, folder, gitConfig]);
        var fileName = context.capitalizedName + 'Module.ts';
        var target = path.join(p.target, 'modules', context.path);
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
});