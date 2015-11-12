/**
 * MODEL
 * -------------------------------------------------------------
 *
 * This task scaffolds a TypeScript Model with his interfaces
 */
'use strict';

var gulp = require('gulp'),
  conflict = require('gulp-conflict'),
  template = require('gulp-template'),
  rename = require('gulp-rename'),
  _ = require('underscore.string'),
  lodash = require('lodash'),
  chalk = require('chalk'),
  inquirer = require('inquirer'),
  fs = require('fs'),
  path = require('path'),
  util = require('../util.js');

gulp.task('model', function (done) {
  var prompts = [
    {
      name: 'name',
      message: 'What is the name of your model?'
    }, {
      name: 'description',
      message: 'Please describe your new model:'
    }
  ];

  //Ask
  inquirer.prompt(prompts, function (answers) {
    util.folderPrompt('models', function (folder) {
      jsonDtosPrompt(done, function (response) {
        util.getGitConfig(function (gitConfig) {

          // Build Context and Paths
          var p = util.getPaths('model', ['ts']);
          var context = util.buildContext([answers, folder, gitConfig]);
          context = buildModelProperties(context, response);
          var target = path.join(p.target, context.path);

          // Generators
          generateModel(target, context, function () {
            generateModelInterface(target, context, function () {
              done();
            })
          });

        });
      });
    });
  });
});

function generateModel(target, context, done) {
  var fileName = context.capitalizedName + 'Model.ts';
  var sourceClass = path.join(__dirname, '../templates/model/Model.ts');
  gulp.src(sourceClass)
    .pipe(template(context))
    .pipe(rename(fileName))
    .pipe(conflict(target))
    .pipe(gulp.dest(target))
    .on('end', function () {
      util.onSuccess('Model', path.join(target, fileName));
      done();
    });
}

function generateModelInterface(target, context, done) {
  var fileName = 'I' + context.capitalizedName + 'Model.ts';
  var sourceClass = path.join(__dirname, '../templates/model/IModel.ts');
  gulp.src(sourceClass)
    .pipe(template(context))
    .pipe(rename(fileName))
    .pipe(conflict(target))
    .pipe(gulp.dest(target))
    .on('end', function () {
      util.onSuccess('Model', path.join(target, fileName));
      done();
    });
}

function buildModelProperties(ctx, res) {
  console.log('');
  var file = './dtos/' + res + '.json';
  var obj = JSON.parse(fs.readFileSync(file, 'utf8'));
  var modelProperties = [];
  for (var key in obj) {
    var regExDate = /^((((19|[2-9]\d)\d{2})[\/\.-](0[13578]|1[02])[\/\.-](0[1-9]|[12]\d|3[01])\s(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]))|(((19|[2-9]\d)\d{2})[\/\.-](0[13456789]|1[012])[\/\.-](0[1-9]|[12]\d|30)\s(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]))|(((19|[2-9]\d)\d{2})[\/\.-](02)[\/\.-](0[1-9]|1\d|2[0-8])\s(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))[\/\.-](02)[\/\.-](29)\s(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])))$/g;
    var type = 'any';
    var isObject = false;
    var isArray= false;
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
    if (lodash.isObject(obj[key])) {
      isObject = true;
      type = 'I' + _.capitalize(key) + 'Model';
    }
    if (lodash.isArray(obj[key])) {
      isArray = true;
      type = 'I' + _.capitalize(key) + 'Model[]';
    }
    console.log(chalk.blue(key) + ': ' + chalk.bold.red(type));
    modelProperties.push({
      inApiName: key,
      inAppName: _.camelize(key),
      type: type,
      isObject: isObject,
      isArray: isArray
    });
  }
  console.log('');
  ctx.modelProperties = modelProperties;
  return ctx;
}

function jsonDtosPrompt(stop, done) {
  readJsonDtosRespones(function (jsons) {
    if (jsons.length === 0) {
      util.onError('Please place a json response in to the ./dtos folder');
      stop();
    } else {
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
    }
  });
}

function readJsonDtosRespones(done) {
  fs.readdir('./dtos', function (err, files) {
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
