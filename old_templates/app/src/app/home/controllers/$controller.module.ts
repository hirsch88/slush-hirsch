/// <reference path="../../../../typings/tsd.d.ts" />

module <%= appPrefix %>.home.controllers {
  'use strict';

  export var Namespace = '<%= appPrefix %>.home.controllers';

  export var ID = {
      HomeController: `${Namespace}.HomeController`
  };

  angular
    .module(Namespace, [
      ID.HomeController
    ]);


}
