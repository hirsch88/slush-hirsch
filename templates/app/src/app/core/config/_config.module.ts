/// <reference path="../../../../typings/tsd.d.ts" />

module <%= prefix %>.core.config {
  'use strict';

  export var Namespace = '<%= prefix %>.core.config';

  export var ID = {
    AppConfig: `${Namespace}.AppConfig`
  };

  angular
    .module(Namespace, [
      ID.AppConfig
    ]);

}
