// /**
//  * DEFAULT
//  * -------------------------------------------------------------
//  *
//  * This task scaffolds a TypeScript AngularJS App
//  */
// 'use strict';

// var gulp     = require('gulp'),
//     install  = require('gulp-install'),
//     tsd      = require('gulp-tsd'),
//     conflict = require('gulp-conflict'),
//     template = require('gulp-template'),
//     rename   = require('gulp-rename'),
//     _        = require('underscore.string'),
//     inquirer = require('inquirer'),
//     path     = require('path');

// var util = require('../util.js');
// var defaults = util.defaults();

// gulp.task('default', function (done) {
//   var prompts = [{
//     name: 'appName',
//     message: 'What is the name of your project?',
//     default: defaults.appName
//   }, {
//     name: 'appPrefix',
//     message: 'What is the prefix of your AngularJS app?',
//     default: 'my'
//   }, {
//     name: 'appDescription',
//     message: 'What is the description?'
//   }, {
//     name: 'appVersion',
//     message: 'What is the version of your project?',
//     default: '0.0.0'
//   }, {
//     name: 'authorName',
//     message: 'What is the author name?',
//     default: defaults.authorName
//   }, {
//     name: 'authorEmail',
//     message: 'What is the author email?',
//     default: defaults.authorEmail
//   }, {
//     name: 'userName',
//     message: 'What is the github username?',
//     default: defaults.userName
//   }, {
//     type: 'confirm',
//     name: 'moveon',
//     message: 'Continue?'
//   }];
//   //Ask
//   inquirer.prompt(prompts,
//     function (answers) {
//       if (!answers.moveon) {
//         return done();
//       }

//       var source = path.join(__dirname, '../', 'templates/app/**');
//       var target = './'; //path.basename(process.cwd());

//       answers.appNameSlug = _.slugify(answers.appName);
//       answers.Namespace = '${Namespace}';
//       answers.prefix = answers.appPrefix;

//       answers.bannerAppName = '<%= name %>';
//       answers.bannerAppDescription = '<%= description %>';
//       answers.bannerAppVersion = '<%= version %>';
//       answers.bannerAppAuthor = '<%= author %>';
//       answers.bannerAppLicense = '<%= licenses %>';

//       gulp.src(source)
//         .pipe(template(answers))
//         .pipe(rename(function (file) {
//           if (file.basename[0] === '_') {
//             file.basename = '.' + file.basename.slice(1);
//           }
//           if (file.basename[0] === '$') {
//             file.basename = '_' + file.basename.slice(1);
//           }
//         }))
//         .pipe(conflict(target))
//         .pipe(gulp.dest(target))
//         .pipe(install())
//         .on('end', function () {
//           tsd({
//             command: 'reinstall',
//             config: target + '/tsd.json'
//           }, function () {
//             console.log(util.hirschSayHi());
//             done();
//           });
//         });
//     });
// });