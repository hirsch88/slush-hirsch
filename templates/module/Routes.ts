/// <reference path="../../../../<%= typingNesting %>typings/tsd.d.ts" />

/**
 * @name <%= capitalizedName %>Routes
 * @author <%= gitConfig.user.name %> (<%= gitConfig.user.email %>)
 * @date <%= date %>
 */
module app.<%= namespace %> {
  'use strict';

  var Routes = ($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider
      .state('admin.<%= namespace %>', {
        url: '/<%=camelizedName %>',
        views: {
          'content': {
            templateUrl: 'app/modules/<%= path %>/<%= capitalizedName %>View.html'
            // controller: IID.<%= capitalizedName %>Controller,
            // controllerAs: 'vm'
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
