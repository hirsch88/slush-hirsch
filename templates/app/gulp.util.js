/**
 * Gulp Util
 * --------------------------------
 *
 *
 */

'use strict';

var gulpConfig = require('./gulp.config.js'),
    path       = require('path'),
    bowerFiles = (!isGenerator) ? require('main-bower-files') : [],
    wiredep    = require('wiredep');

module.exports = function () {

  getPackageJson

};