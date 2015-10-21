'use strict';

var gulp       = require('gulp'),
    gulpConfig = require(process.cwd() + '/gulp.config.js'),
    gulpUtil   = require(process.cwd() + '/gulp.util.js'),
    $          = require('gulp-load-plugins')({lazy: true}),
    typescript = require('typescript');

var tsProject = $.typescript.createProject(process.cwd() + '/tsconfig.json', {
  typescript: typescript
});

/**
 * TS
 * Lints and compiles all .ts source files in the app.
 */
gulp.task('ts-compile', ['ts-lint'], function () {
  return gulp.src([
    gulpConfig.paths.srcDir + '/' + gulpConfig.paths.app.scripts.replace(/\.js$/, '.ts'),
    'typings/**/*.d.ts'
  ], {
    base: '.'
  })
    .pipe($.sourcemaps.init())
    .pipe($.typescript(tsProject))
    .js
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.'));
});
