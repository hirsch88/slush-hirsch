/// <reference path="../../typings/tsd.d.ts"/>

module <%= appPrefix %> {
  'use strict';

  angular
    .module('<%= appPrefix %>', [
      // AngularJS Libs
      'ngSanitize',
      //'ngMessages',
      //'ngAnimate',

      // Third-Party Libs
      //'pascalprecht.translate',
      'ui.router',
      //'angular-loading-bar',

      // Configs, middleware, run...
      //'<%= appPrefix %>.core',

      // Common components, services, filters...
      //'<%= appPrefix %>.common',

      // App modules with business logic
      '<%= appPrefix %>.home',

    ]);

}
