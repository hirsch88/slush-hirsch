/**
 * COMPONENT
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

gulp.task('cmp', ['component']);
gulp.task('component', function (done) {
  var prompts = [{
    name: 'name',
    message: 'What is the name of your component?'
  }, {
    type: 'boolean',
    name: 'hasController',
    message: 'Do you need a controller?',
    default: true
  }, {
    type: 'boolean',
    name: 'hasLinkFnc',
    message: 'Do you need a link method?',
    default: false
  }];

  //Ask
  inquirer.prompt(prompts, function (answers) {
    util.modulePrompt(function (module) {
      util.folderPrompt('components', function (folder) {
        var p = util.getPaths('component', ['ts', 'html']);
        var context = util.buildContext([answers, folder]);
        context.templateUrl = path.join('./app/', folder.namespace, context.camelizedName + '.component.html');
        var fileName = context.camelizedName + '.component.ts';
        var target = path.join(p.target, module, context.path);
        console.log(target);
        context.module = module;
        gulp.src(p.source)
          .pipe(template(context))
          .pipe(rename(fileName))
          .pipe(conflict(target))
          .pipe(gulp.dest(target))
          .on('end', function () {
            done();
            util.onSuccess('Component', path.join(target, fileName));
          });
      });
    });
  });
});
