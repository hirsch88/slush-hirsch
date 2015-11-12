'use strict';

var gulp = require('gulp');

gulp.task('service', function (done) {
  var $hirsch = require('../hirschGenerator.js')('service', 'app.serviceDir', done);
  $hirsch
    // .pipe(function (next, abort) {
    //   console.log('asdfasdfas', $hirsch.name);
    //   next();
    // })
    .template({
        template: '_service.tpl.ts',
        fileName: '<%= capitalizedName %>Service.ts'
      })
    .end(function () {
      console.log('');
    });
});
