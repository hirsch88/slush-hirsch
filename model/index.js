'use strict';

var gulp = require('gulp'),
  _ = require('underscore.string'),
  lodash = require('lodash'),
  chalk = require('chalk'),
  inquirer = require('inquirer'),
  fs = require('fs'),
  path = require('path'),
  util = require('../util.js');

gulp.task('model', function (done) {
  var $hirsch = require('../hirschGenerator.js')('model', 'app.modelDir', done);
  $hirsch
    .pipe(function (next, abort) {
      console.log('=> JSON Response');
      jsonDtosPrompt(abort, function(response) {
        $hirsch.context = buildModelProperties($hirsch.context, response);
        next();
      });
    })
    .template({
      template: '_imodel.tpl.ts',
      fileName: 'I<%= capitalizedName %>Model.ts'
    })
    .template({
      template: '_model.tpl.ts',
      fileName: '<%= capitalizedName %>Model.ts'
    })
    .end(function () {
      console.log('');
    });
});

/**
 *
 */
function buildModelProperties(ctx, res) {
  console.log('');
  var file = './dtos/' + res + '.json';
  var obj = JSON.parse(fs.readFileSync(file, 'utf8'));
  var modelProperties = [];
  for (var key in obj) {
    var regExDate = /^((((19|[2-9]\d)\d{2})[\/\.-](0[13578]|1[02])[\/\.-](0[1-9]|[12]\d|3[01])\s(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]))|(((19|[2-9]\d)\d{2})[\/\.-](0[13456789]|1[012])[\/\.-](0[1-9]|[12]\d|30)\s(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]))|(((19|[2-9]\d)\d{2})[\/\.-](02)[\/\.-](0[1-9]|1\d|2[0-8])\s(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))[\/\.-](02)[\/\.-](29)\s(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])))$/g;
    var type = 'any';
    var isObject = false;
    var isArray = false;
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

/**
 *
 */
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

/**
 *
 */
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
