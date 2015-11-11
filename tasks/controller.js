/**
 * CONTROLLER
 * -------------------------------------------------------------
 *
 * This task scaffolds a TypeScript Model
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

gulp.task('ctrl', ['controller']);
gulp.task('controller', function (done) {
  var prompts = [
    {
      name: 'name',
      message: 'What is the name of your controller?'
    }, {
      name: 'description',
      message: 'Please describe your new controller:'
    }
  ];
  //Ask
  inquirer.prompt(prompts, function (answers) {
    util.modulePrompt(function (module) {
      util.folderPrompt(module, function (folder) {
        util.getGitConfig(function (gitConfig) {

          // Build Context and Paths
          var p = util.getPaths('controller', ['ts']);
          var context = util.buildContext([answers, folder, gitConfig]);
          var target = path.join(p.target, 'modules', context.path);
          // Generates the controller
          generateController(target, context, function () {
            done();
          });

        });
      });
    });
  });
});

function generateController(target, context, done) {
  var fileName = context.capitalizedName + 'Controller.ts';
  var sourceClass = path.join(__dirname, '../templates/controller/Controller.ts');
  gulp.src(sourceClass)
    .pipe(template(context))
    .pipe(rename(fileName))
    .pipe(conflict(target))
    .pipe(gulp.dest(target))
    .on('end', function () {
      util.onSuccess('Controller', path.join(target, fileName));
      done();
    });
}