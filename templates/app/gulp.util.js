/**
 * Gulp Util
 * --------------------------------
 * This util has some useful methods for the gulp tasks
 *
 */

'use strict';

var gulp        = require('gulp'),
    $           = require('gulp-load-plugins')({lazy: true}),
    gulpConfig  = require('./gulp.config.js'),
    path        = require('path'),
    chalk       = require('chalk'),
    _           = require('lodash'),
    bowerFiles  = require('main-bower-files'),
    browserSync = require('browser-sync'),
    wiredep     = require('wiredep');

var gulpUtil = {

  errors: {
    lint: [],
    compile: [],
    sass: []
  },

  buildErrorReporting: buildErrorReporting,
  buildIndex: buildIndex,
  onSuccess: onSuccess,
  onError: onError,
  onInfo: onInfo,
  getBowerFiles: getBowerFiles,
  getNgFiles: getNgFiles,
  getPkg: getPkg

};

module.exports = gulpUtil;

function getPkg() {
  return require(path.join(process.cwd(), 'package.json'));
}

function getNgFiles() {
  return [
    path.join(gulpConfig.paths.srcDir, gulpConfig.paths.app.bootstrap),
    path.join(gulpConfig.paths.srcDir, gulpConfig.paths.app.util),
    path.join(gulpConfig.paths.srcDir, gulpConfig.paths.app.main),
    path.join(gulpConfig.paths.srcDir, gulpConfig.paths.app.modules),
    path.join(gulpConfig.paths.srcDir, gulpConfig.paths.app.routes),
    path.join(gulpConfig.paths.srcDir, gulpConfig.paths.app.constants),
    path.join(gulpConfig.paths.srcDir, gulpConfig.paths.app.configs),
    path.join(gulpConfig.paths.srcDir, gulpConfig.paths.app.coreDir, '**/*.js'),
    path.join(gulpConfig.paths.srcDir, gulpConfig.paths.app.commonDir, '**/*.js'),
    path.join(gulpConfig.paths.srcDir, gulpConfig.paths.app.scripts)
  ];
}

function getBowerFiles() {
  var bowerFilesJs = wiredep({})['js'];
  var bowerFilesCss = wiredep({})['css'];
  var bowerFilesFonts = ['bootstrap']
    .map(function (s) {
      return wiredep({}).packages[s].main;
    })
    .reduce(function (a, b) {
      return a.concat(b);
    })
    .filter(function (p) {
      return new RegExp('\\' + path.sep + 'fonts\\' + path.sep).test(p);
    });

  return {
    files: {
      js: [].concat(
        bowerFilesJs
      ),
      css: [].concat(
        bowerFilesCss
      ),
      fonts: [].concat(
        bowerFilesFonts
      ),
      main: bowerFiles
    }
  };
}

function onSuccess(text) {
  console.log('[' + chalk.green(' ✔ ') + '] ' + text);
}

function onInfo(text) {
  console.log('[' + chalk.blue(' i ') + '] ' + text);
}

function onError(text) {
  console.log('[' + chalk.red(' X ') + '] ' + text);
}

function buildErrorReporting(errors, done) {
  gulp.src(gulpConfig.paths.taskDir + '/errors.html')
    .pipe($.template(errors))
    .pipe($.rename('index.html'))
    .pipe(gulp.dest(gulpConfig.paths.srcDir))
    .on('end', function () {
      browserSync.reload();
      onInfo('Error reporting is build');
      if (done) {
        done();
      }
    });
}

function buildIndex(done) {
  var source = [];
  source.push(path.join(gulpConfig.paths.srcDir, gulpConfig.paths.assets.css));

  _.forEach(getNgFiles(), function (item) {
    source.push(item);
  });

  var bowerFiles = getBowerFiles().files.main().filter(function (filePath) {
    return filePath.indexOf(gulpConfig.ignoredBowerFiles) < 0;
  });

  if (gulpUtil.errors.compile.length + gulpUtil.errors.lint.length + gulpUtil.errors.sass.length > 0) {
    done();
  } else {
    gulp
      .src(path.join(gulpConfig.paths.srcDir, gulpConfig.paths.mainTpl))
      .pipe($.inject(gulp.src(bowerFiles, {read: false}), {name: 'bower', relative: true}))
      .pipe($.inject(gulp.src(source), {relative: true}))
      .pipe($.rename(gulpConfig.paths.main))
      .pipe($.template(gulpUtil.getPkg()))
      .pipe(gulp.dest(gulpConfig.paths.srcDir))
      .on('end', function () {
        browserSync.reload();
        onInfo('Index page is build');
        done();
      });
  }
}
