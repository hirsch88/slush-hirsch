'use strict';

var gulp        = require('gulp'),
    gulpConfig  = require(process.cwd() +'/gulp.config.js'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload,
    path        = require('path');

/**
 * SERVE
 * Creates a webserver and adds some watchers to automatically refresh your browser
 */
gulp.task('serve', ['build'], function () {
  browserSync({
    server: {
      baseDir: gulpConfig.paths.srcDir,
      index: gulpConfig.paths.main
    },
    open: false,
    reloadDebounce: 300
  });

  // Bower
  gulp.watch('./bower.json', ['index', 'fonts']);

  // SASS
  gulp.watch(path.join(gulpConfig.paths.srcDir, gulpConfig.paths.assets.sass), ['sass', reload]);

  // TypeScript
  gulp.watch(path.join(gulpConfig.paths.srcDir, gulpConfig.paths.app.scripts.replace(/\.js$/, '.ts')), ['ts-compile', reload]);

  // Templates
  gulp.watch(path.join(gulpConfig.paths.srcDir, gulpConfig.paths.mainTpl), ['index']);

});
