/// <reference path="../../typings/tsd.d.ts"/>

module my {
  'use strict';

  angular
    .module('<%= prefix %>', [
      // AngularJS Libs
      'ngSanitize',
      'ngMessages',
      'ngAnimate',

      // Third-Party Libs
      'pascalprecht.translate',
      'ui.router',
      //'angular-loading-bar',

      // Configs, middleware, run...
      '<%= prefix %>.core',

      // Common components, services, filters...
      '<%= prefix %>.common',

      // App modules with business logic
      '<%= prefix %>.home',

    ]);

}
