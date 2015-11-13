'use strict';

var gulp = require('gulp');

gulp.task('app', function (done) {
  var $hirsch = require('../hirschGenerator.js')('app', '', done);
  var defaultAppName = process.cwd().split('/')[process.cwd().split('/').length-1];

  $hirsch
    .prompt([
      {
        name: 'appName',
        message: 'What is the name of your project?',
        default: defaultAppName
      }, {
        name: 'appPrefix',
        message: 'What is the prefix of your AngularJS app?',
        default: 'my'
      }, {
        name: 'appDescription',
        message: 'What is the description?'
      }, {
        name: 'appVersion',
        message: 'What is the version of your project?',
        default: '0.0.0'
      }, {
        name: 'authorName',
        message: 'What is the author name?',
        default: '<%= git.user.name %>'
      }, {
        name: 'authorEmail',
        message: 'What is the author email?',
        default: '<%= git.user.email %>'
      }, {
        name: 'userName',
        message: 'What is the github username?',
        default: '<%= git.github.user %>'
      }
    ])
    // .pipe(function (next, abort) {
    //   console.log('asdfasdfas', $hirsch.name);
    //   next();
    // })
    .copy({
      source: 'templates/configs/**/*',
      target: ''
    })
    // .template({
    //   template: '_module.tpl.ts',
    //   fileName: '<%= camelizedName %>/<%= capitalizedName %>Module.ts'
    // })
    // .template({
    //   template: '_component.tpl.ts',
    //   fileName: '<%= camelizedName %>/<%= capitalizedName %>Directive.ts'
    // })
    // .template({
    //   condition: 'hasController',
    //   template: '_controller.tpl.ts',
    //   fileName: '<%= camelizedName %>/<%= capitalizedName %>Controller.ts'
    // })
    .end(function () {
      console.log('');
    });
});
