// /**
//  * SERVICE
//  * -------------------------------------------------------------
//  *
//  * This task scaffolds a TypeScript Model
//  */
// 'use strict';

// var gulp = require('gulp'),
//   conflict = require('gulp-conflict'),
//   template = require('gulp-template'),
//   rename = require('gulp-rename'),
//   _ = require('underscore.string'),
//   inquirer = require('inquirer'),
//   path = require('path');

// var util = require('../util.js');

// gulp.task('routes', function (done) {
//   // var prompts = [{
//   //   name: 'name',
//   //   message: 'What is the url of your state?'
//   // }];
//   //Ask
//   // inquirer.prompt(prompts, function (answers) {
//     util.modulePrompt(function (module) {
//       util.folderPrompt('', function (folder) {
//         util.getGitConfig(function (gitConfig) {

//           var p = util.getPaths('Routes', ['ts']);
//           var context = util.buildContext([{}, folder, gitConfig]);

//           var fileName = folder.namespace + _.capitalize(module) + 'Routes.ts';

//           console.log(folder);

//           var target = path.join(p.target, 'modules', module);
//           context.module = module;
//           gulp.src(p.source)
//             .pipe(template(context))
//             .pipe(rename(fileName))
//             .pipe(conflict(target))
//             .pipe(gulp.dest(target))
//             .on('end', function () {
//               done();
//               util.onSuccess('Routes', path.join(target, fileName));
//             });

//         });
//       });
//     });
//   // });
// });
