/**
 * MODEL
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
    lodash   = require('lodash'),
    chalk    = require('chalk'),
    inquirer = require('inquirer'),
    fs       = require('fs'),
    path     = require('path');

var util = require('../util.js');

gulp.task('model', function (done) {
  var prompts = [{
    name: 'name',
    message: 'What is the name of your model?'
  }];
  //Ask
  inquirer.prompt(prompts, function (answers) {
    util.modulePrompt(function (module) {
      util.folderPrompt('models', function (folder) {
        jsonResponsePrompt(function (response) {
          var p = util.getPaths('model');
          var context = util.buildContext([answers, folder]);
          var fileName = context.camelizedName + '.model.ts';
          var target = path.join(p.target, module, context.path);
          context.module = module;
          context = buildModelProperties(context, response);
          gulp.src(p.source)
            .pipe(template(context))
            .pipe(rename(fileName))
            .pipe(conflict(target))
            .pipe(gulp.dest(target))
            .on('end', function () {
              done();
              util.onSuccess('Model', path.join(target, fileName));
            });
        });
      });
    });
  });
});

function buildModelProperties(ctx, res) {
  console.log('');
  var file = './src/assets/responses/' + res + '.json';
  var obj = JSON.parse(fs.readFileSync(file, 'utf8'));
  var modelProperties = [];
  for (var key in obj) {
    var regExDate = /^((((19|[2-9]\d)\d{2})[\/\.-](0[13578]|1[02])[\/\.-](0[1-9]|[12]\d|3[01])\s(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]))|(((19|[2-9]\d)\d{2})[\/\.-](0[13456789]|1[012])[\/\.-](0[1-9]|[12]\d|30)\s(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]))|(((19|[2-9]\d)\d{2})[\/\.-](02)[\/\.-](0[1-9]|1\d|2[0-8])\s(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))[\/\.-](02)[\/\.-](29)\s(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])))$/g;
    var type = 'any';
    if (lodash.isString(obj[key])) {
      type = 'string';
    }
    if (lodash.isNumber(obj[key])) {
      type = 'number';
    }
    if (lodash.isBoolean(obj[key])) {
      type = 'boolean';
    }
    if (regExDate.test(obj[key])) {
      type = 'moment.Moment';
    }
    console.log(chalk.blue(key) + ': ' + chalk.bold.red(type));
    modelProperties.push({
      inApiName: key,
      inAppName: _.camelize(key),
      type: type
    });
  }
  console.log('');
  ctx.modelProperties = modelProperties;
  return ctx;
}

function jsonResponsePrompt(done) {
  readJsonRespones(function (jsons) {
    var prompts = [{
      type: 'list',
      name: 'json',
      message: 'Choose a json response?',
      choices: jsons,
      default: 0
    }];
    inquirer.prompt(prompts, function (answers) {
      done(answers.json);
    });
  });
}

function readJsonRespones(done) {
  fs.readdir('./src/assets/responses', function (err, files) {
    if (files) {
      files = files.filter(function (file) {
        var ext = file.split('.')[file.split('.').length - 1];
        return ext === 'json';
      }).map(function (file) {
        return file.slice(0, file.length - 5);
      });
      done(files);
    } else {
      done([]);
    }
  });
}