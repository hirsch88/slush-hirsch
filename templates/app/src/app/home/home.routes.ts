/// <reference path="../../../typings/tsd.d.ts" />

module <%= appPrefix %>.home {
  'use strict';

  var Routes = ($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider
      .state('home', {
        url: '/home',
        views: {
          'root': {
            templateUrl: 'src/app/home/views/HomeView.html',
            controller: controllers.ID.HomeController,
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
