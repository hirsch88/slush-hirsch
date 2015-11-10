/// <reference path="../../../<%= typingNesting %>typings/tsd.d.ts" />

module <%= prefix %>.<%= module %> {
  'use strict';

  var Routes = ($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider
      .state('admin.<%= camelizedName %>', {
        url: '/<%= camelizedName %>',
        views: {
          'content': {
            templateUrl: 'app/<%= camelizedName %>/views/<%= camelizedName %>.view.html',
            controller: controllers.ID.<%= capitalizedName %>Controller,
            controllerAs: 'vm'
          }
        }
      });
  };
  Routes.$inject = ['$stateProvider'];

  angular
    .module(`${Namespace}.Routes`, [
      'ui.router'
    ])
    .config(Routes);

}
