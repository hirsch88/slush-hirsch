'use strict';

var gulp        = require('gulp'),
    gulpConfig  = require(process.cwd() + '/gulp.config.js'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload,
    stream      = browserSync.stream,
    path        = require('path');

var server = require('gulp-server-livereload');

gulp.task('server', ['build'], function () {
  startServer(true);
});

gulp.task('serve', ['build'], function () {
  startServer(true);

  // Bower
  gulp.watch('./bower.json', ['index', 'fonts']);

  // SASS
  gulp.watch(path.join(gulpConfig.paths.srcDir, gulpConfig.paths.assets.sass), ['sass-serve', stream]);

  // TypeScript
  gulp.watch(path.join(gulpConfig.paths.srcDir, gulpConfig.paths.app.scripts.replace(/\.js$/, '.ts')), ['ts-serve', stream]);

  // Templates
  gulp.watch(path.join(gulpConfig.paths.srcDir, gulpConfig.paths.mainTpl), ['index-serve']);

});


function startServer(open) {
  browserSync({
    server: {
      baseDir: gulpConfig.paths.srcDir,
      index: gulpConfig.paths.main
    },
    open: open,
    reloadDebounce: 300,
    logLevel: "info",
    logConnections: true
  });
}
