'use strict';

var gulp = require('gulp');

gulp.task('module', function (done) {
  var $hirsch = require('../hirschGenerator.js')('module', 'app.modulesDir', done);
  $hirsch
    .prompt([
      {
        type: 'text',
        name: 'url',
        message: 'Tell us the url path for your new view:',
        default: '/<%= slugedName %>'
      }
    ])
    .template({
      template: '_module.tpl.ts',
      fileName: '<%= camelizedName %>/<%= capitalizedName %>Module.ts'
    })
    .template({
      template: '_routes.tpl.ts',
      fileName: '<%= camelizedName %>/<%= capitalizedName %>Routes.ts'
    })
    .template({
      template: '_view.tpl.html',
      fileName: '<%= camelizedName %>/<%= capitalizedName %>View.html'
    })
    .template({
      template: '_controller.tpl.ts',
      fileName: '<%= camelizedName %>/<%= capitalizedName %>Controller.ts'
    })
    .end(function () {
      console.log('');
    });
});
