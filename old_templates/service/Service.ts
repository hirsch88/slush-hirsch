/// <reference path="../../../<%= typingNesting %>typings/tsd.d.ts"/>

/**
 * @name I<%= capitalizedName %>Service
 * @author <%= gitConfig.user.name %> (<%= gitConfig.user.email %>)
 * @date <%= date %>
 *
 * @description
 * <%= description %>
 */
module app.<%= namespace %> {
    'use strict';


  interface I<%= capitalizedName %>Service {
    method(param: string): string;
  }

  export class <%= capitalizedName %>Service implements I<%= capitalizedName %>Service {
    static $inject = [];

    private field;

    constructor() {
      this.field = 'value';
    }

    //region Public Api
    //====================================================================================================
    public method(param: string) {
      return param;
    }

    //endregion
    //region Private Api
    //====================================================================================================

    //endregion

  }

  angular
    .module(Namespace)
    .service(IID.<%= capitalizedName %>, <%= capitalizedName %>);

}
