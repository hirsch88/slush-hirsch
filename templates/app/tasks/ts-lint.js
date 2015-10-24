'use strict';

var gulp       = require('gulp'),
    gulpConfig = require(process.cwd() + '/gulp.config.js'),
    gulpUtil   = require(process.cwd() + '/gulp.util.js'),
    $          = require('gulp-load-plugins')({lazy: true});

/**
 * TSLINT
 * Lints all .ts source files in the app.
 */
gulp.task('ts-lint', function () {
  gulpUtil.errors.lint = [];
  return gulp.src([
    gulpConfig.paths.srcDir + '/' + gulpConfig.paths.app.scripts.replace(/\.js$/, '.ts')
  ])
    .pipe($.plumber())
    .pipe($.tslint())
    .pipe($.tslint.report(tslintReporter));
});

function tslintReporter(output, file, options) {
  output.forEach(function (item) {
    gulpUtil.onError('[ LINT ] (' + item.ruleName + ') ' + item.name + '[' + item.startPosition.line + ', ' + item.startPosition.character + ']: ' + item.failure);
    gulpUtil.errors.lint.push('(' + item.ruleName + ') <i>' + item.name + '[' + item.startPosition.line + ', ' + item.startPosition.character + ']:</i> ' + item.failure);
  });
  gulpUtil.buildErrorReporting(gulpUtil.errors);
}


