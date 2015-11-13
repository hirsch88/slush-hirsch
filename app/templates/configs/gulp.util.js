'use strict';

var gulp      = require('gulp'),
  $           = require('gulp-load-plugins')({ lazy: true }),
  gulpConfig  = require('./gulp.config.js'),
  $p          = gulpConfig.paths,
  path        = require('path'),
  chalk       = require('chalk'),
  _           = require('lodash'),
  bowerFiles  = require('main-bower-files'),
  browserSync = require('browser-sync'),
  wiredep     = require('wiredep');

/**
 * GulpUtil API
 */
var gulpUtil = {

  errors: {
    lint: [],
    compile: [],
    sass: []
  },

  buildErrorReporting: buildErrorReporting,
  getAppDistFilename: getAppDistFilename,
  getBowerDistFilename: getBowerDistFilename,
  buildIndex: buildIndex,
  onSuccess: onSuccess,
  onError: onError,
  onInfo: onInfo,
  getBowerFiles: getBowerFiles,
  getNgFiles: getNgFiles,
  getPkg: getPkg,
  notify: notify,
  getKarmaOptions: getKarmaOptions

};
module.exports = gulpUtil;

/**
 *
 */
function getPkg() {
  return require(path.join(process.cwd(), 'package.json'));
}
/**
 *
 */
function getNgFiles() {
  return [
    path.join($p.base, $p.appDir, $p.app.bootstrap),
    path.join($p.base, $p.appDir, $p.app.util),
    path.join($p.base, $p.appDir, $p.app.main),
    path.join($p.base, $p.appDir, $p.app.modules),
    path.join($p.base, $p.appDir, $p.app.scripts)
  ];
}
/**
 *
 */
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
/**
 *
 */
function onSuccess(text) {
  console.log('[' + chalk.green(' ✔ ') + '] ' + text);
}
/**
 *
 */
function onInfo(text) {
  console.log('[' + chalk.blue(' i ') + '] ' + text);
}
/**
 *
 */
function onError(text) {
  console.log('[' + chalk.red(' X ') + '] ' + text);
}
/**
 *
 */
function getBowerDistFilename(extension) {
  return _buildDistFileName('bower', extension);
}
/**
 *
 */
function getAppDistFilename(extension) {
  return _buildDistFileName(getPkg().name, extension);
}
/**
 *
 */
function _buildDistFileName(name, extension) {
  extension = extension || 'js';
  return name + '-' + getPkg().version + '.min.' + extension;
}
/**
 *
 */
function buildErrorReporting(errors, done) {
  gulp.src($p.taskDir + '/errors.html')
    .pipe($.template(errors))
    .pipe($.rename('index.html'))
    .pipe(gulp.dest($p.base))
    .on('end', function () {
      browserSync.reload();
      onInfo('Error reporting is build');
      if (done) {
        done();
      }
    });
}
/**
 *
 */
function buildIndex(done) {
  var source = [];
  source.push(path.join($p.base, $p.assetsDir, $p.css));
  source.push(path.join($p.base, 'app.debug.js'));

  var bowerFiles = getBowerFiles().files.main();
  if (gulpConfig.ignoredBowerFiles.length > 0) {
    bowerFiles = bowerFiles.filter(function (filePath) {
      return filePath.indexOf(gulpConfig.ignoredBowerFiles) < 0;
    });
  }

  if (gulpUtil.errors.compile.length + gulpUtil.errors.lint.length + gulpUtil.errors.sass.length > 0) {
    done();
  } else {
    gulp
      .src(path.join($p.base, $p.mainTpl))
      .pipe($.inject(gulp.src(bowerFiles, { read: false }), { name: 'bower', relative: true }))
      .pipe($.inject(gulp.src(source), { relative: true }))
      .pipe($.rename($p.main))
      .pipe($.template(gulpUtil.getPkg()))
      .pipe(gulp.dest($p.base))
      .on('end', function () {
        browserSync.reload();
        onInfo('Index page is build');
        done();
      });
  }
}
/**
 *
 */
function getKarmaOptions() {
  return {
    files: [].concat(
      getBowerFiles().files.js,
    // config.specHelpers,
      'src/app.debug.js',
      'test/unit/**/*.js'
      ),
    exclude: [],
    preprocessors: {}
  };
}
/**
 *
 */
function notify(title, message)  {
  var notifier = require('node-notifier');
  notifier.notify({
    'title': title || 'Gulp',
    'message': message || 'Please check your log or open your browser.',
    icon: process.cwd() + '/icon.png'
  });
}
