/// <reference path="../../../../<%= typingNesting %>typings/tsd.d.ts" />

module app.<%= namespace %>.<%= camelizedName %> {
  'use strict';

  var Routes = ($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider
      .state('admin.<%= camelizedName %>', {
        url: '<%= url %>',
        views: {
          'content': {
            templateUrl: '<%= paths.appDir %>/<%= path %>/<%= camelizedName %>/<%= capitalizedName %>View.html',
            controller: IID.<%= capitalizedName %>Controller,
            controllerAs: 'vm'
          }
        },
        data: {
          session: true
        }
      });
  };
  Routes.$inject = ['$stateProvider'];

  angular
    .module(Namespace)
    .config(Routes);

}
