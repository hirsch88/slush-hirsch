/// <reference path="../../../../typings/tsd.d.ts" />

module <%= appPrefix %>.home {
  'use strict';

  export var Namespace = '<%= appPrefix %>.home';

  angular
    .module(Namespace, [
      `${Namespace}.Routes`,
      `${Namespace}.controllers`,
    ]);

}