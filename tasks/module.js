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
  path = require('path'),
  util = require('../util.js');

gulp.task('module', function (done) {
  var prompts = [
    {
      name: 'name',
      message: 'What is the name of your module?'
    }, {
      name: 'description',
      message: 'Please describe your new module:'
    }, {
      name: 'hasRoutes',
      message: 'Do you need a Routes file?',
      default: 'Yes'
    }
  ];
  //Ask
  inquirer.prompt(prompts, function (answers) {
    util.folderPrompt(answers.name, function (folder) {
      util.getGitConfig(function (gitConfig) {
        answers.hasRoutes = answers.hasRoutes.toUpperCase() === 'YES' || answers.hasRoutes.toUpperCase() === 'Y';

        var p = util.getPaths('Module', ['ts']);
        var context = util.buildContext([answers, folder, gitConfig]);
        var target = path.join(p.target, 'modules', context.path);

        // Generates the new feature model
        generateModule(target, context, function () {
          // If routes is selected than generate a route fila along
          if (answers.hasRoutes) {
            generateRoutes(target, context, function () {
              done();
            });
          } else {
            done();
          }

        });

      });
    });
  });

});

function generateModule(target, context, done) {
  var fileName = context.capitalizedName + 'Module.ts';
  var sourceClass = path.join(__dirname, '../templates/module/Module.ts');
  gulp.src(sourceClass)
    .pipe(template(context))
    .pipe(rename(fileName))
    .pipe(conflict(target))
    .pipe(gulp.dest(target))
    .on('end', function () {
      util.onSuccess('Module', path.join(target, fileName));
      done();
    });
}

function generateRoutes(target, context, done) {
  var fileName = context.capitalizedName + 'Routes.ts';
  var sourceClass = path.join(__dirname, '../templates/module/Routes.ts');
  gulp.src(sourceClass)
    .pipe(template(context))
    .pipe(rename(fileName))
    .pipe(conflict(target))
    .pipe(gulp.dest(target))
    .on('end', function () {
      util.onSuccess('Routes', path.join(target, fileName));
      done();
    });
}