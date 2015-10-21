/// <reference path="../../../typings/tsd.d.ts" />

module <%= prefix %>.core {
  'use strict';

  export var Namespace = '<%= prefix %>.core';

  angular
    .module(Namespace, [
      `${Namespace}.config`,
      `${Namespace}.helper`
    ]);

}
