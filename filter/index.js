'use strict';

var gulp = require('gulp');

gulp.task('filter', function (done) {
  var $hirsch = require('../hirschGenerator.js')('filter', 'app.filterDir', done);
  $hirsch
    .template({
        template: '_filter.tpl.ts',
        fileName: '<%= capitalizedName %>Filter.ts'
      })
    .end(function () {
      console.log('');
    });
});
