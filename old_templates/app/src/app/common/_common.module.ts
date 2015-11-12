/// <reference path="../../../typings/tsd.d.ts" />

module <%= prefix %>.common {
  'use strict';

  export var Namespace = '<%= prefix %>.common';

  angular
    .module(Namespace, [
      `${Namespace}.components`,
      `${Namespace}.filters`,
      `${Namespace}.services`,
    ]);

}
