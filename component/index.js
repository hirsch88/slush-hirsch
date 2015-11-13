'use strict';

var gulp = require('gulp');

gulp.task('component', function (done) {
  var $hirsch = require('../hirschGenerator.js')('component', 'app.componentDir', done);
  $hirsch
    .prompt([
      {
        type: 'boolean',
        name: 'hasController',
        message: 'Do you need a controller?',
        default: true
      }, {
        type: 'boolean',
        name: 'hasLinkFnc',
        message: 'Do you need a link method?',
        default: false
      }
    ])
    .template({
      template: '_module.tpl.ts',
      fileName: '<%= camelizedName %>/<%= capitalizedName %>Module.ts'
    })
    .template({
      template: '_component.tpl.ts',
      fileName: '<%= camelizedName %>/<%= capitalizedName %>Directive.ts'
    })
    .template({
      condition: 'hasController',
      template: '_controller.tpl.ts',
      fileName: '<%= camelizedName %>/<%= capitalizedName %>Controller.ts'
    })
    .end(function () {
      console.log('');
    });
});
