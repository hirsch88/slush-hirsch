'use strict';

var gulp = require('gulp');

gulp.task('controller', function (done) {
  var $hirsch = require('../hirschGenerator.js')('controller', 'app.controllerDir', done);
  $hirsch
    .template({
        template: '_controller.tpl.ts',
        fileName: '<%= capitalizedName %>Controller.ts'
      })
    .end(function () {
      console.log('');
    });
});
