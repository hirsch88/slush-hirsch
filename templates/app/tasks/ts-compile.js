'use strict';

var gulp        = require('gulp'),
    gulpConfig  = require(process.cwd() + '/gulp.config.js'),
    gulpUtil    = require(process.cwd() + '/gulp.util.js'),
    $           = require('gulp-load-plugins')({lazy: true}),
    path        = require('path');
/**
 * TS
 * Lints and compiles all .ts source files in the app.
 */
gulp.task('ts-compile', ['ts-lint'], function (done) {
  var tsconfig = gulpConfig.typescript;
  tsconfig.out = 'c3le-admin-panel';

  var tsResult = gulp.src([
    gulpConfig.paths.srcDir + '/' + gulpConfig.paths.app.scripts.replace(/\.js$/, '.ts'),
    'typings/**/*.d.ts'
  ], {
    base: '.'
  })
    .pipe($.sourcemaps.init()) // This means sourcemaps will be generated
    .pipe($.typescript({
      target: 'es5',
      sortOutput: true,
      removeComments: true,
      noEmitOnError: true
    }));

  tsResult.js
    .on('error', function (err) {
      gulpUtil.onError('[ TS ] (TS' + err.diagnostic.code + ') ' + err.relativeFilename + '[' + err.startPosition.line + ', ' + err.startPosition.character + ']: ' + err.diagnostic.messageText);
      gulpUtil.errors.compile.push('(TS' + err.diagnostic.code + ') <i>' + err.relativeFilename + '[' + err.startPosition.line + ', ' + err.startPosition.character + ']: </i>' + err.diagnostic.messageText);
    })
    .pipe($.concat('app.debug.js')) // You can use other plugins that also support gulp-sourcemaps
    .pipe($.sourcemaps.write()) // Now the sourcemaps are added to the .js file
    .pipe(gulp.dest(path.join(gulpConfig.paths.srcDir, gulpConfig.paths.appDir)))
    .on('end', function () {
      if (gulpUtil.errors.compile.length === 0) {
        done();
      } else {
        gulpUtil.buildErrorReporting(gulpUtil.errors, done);
      }
    });

});
