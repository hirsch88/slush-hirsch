'use strict';

var gulp = require('gulp');

gulp.task('view', function (done) {
  var $hirsch = require('../hirschGenerator.js')('view', 'app.modulesDir', done);
  $hirsch
    .template({
      template: '_view.tpl.html',
      fileName: '<%= capitalizedName %>View.html'
    })
    .template({
      template: '_controller.tpl.ts',
      fileName: '<%= capitalizedName %>Controller.ts'
    })
    .end(function () {
      console.log('');
    });
});
