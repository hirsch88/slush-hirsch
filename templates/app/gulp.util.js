/**
 * Gulp Util
 * --------------------------------
 * This util has some useful methods for the gulp tasks
 *
 */

'use strict';

var gulpConfig = require('./gulp.config.js'),
    path       = require('path'),
    bowerFiles = require('main-bower-files'),
    wiredep    = require('wiredep');

module.exports = {

  onSuccess: onSuccess,
  onError: onError,
  onInfo: onInfo,
  getBowerFiles: getBowerFiles,
  getNgFiles: getNgFiles,
  getPkg: getPkg

};

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
