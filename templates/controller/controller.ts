/// <reference path="../../../../<%= typingNesting %>typings/tsd.d.ts"/>

module <%= prefix %>.<%= module %>.<%= namespace %> {
    'use strict';

  // INTERFACE ////////////////////////////////////////////////////////////////////
  interface I<%= capitalizedName %>Scope {
    method(param: string): string;
  }


  // CONTROLLER ////////////////////////////////////////////////////////////////////
  export class <%= capitalizedName %>Controller implements I<%= capitalizedName %>Scope {
    static $inject = [];

    public field;


    constructor() {
      this.field = 'value';
    }


    // PUBLIC API /////////////////////////////////////////////
    method(param: string) {
      return param;
    }


    // PRIVATE API ////////////////////////////////////////////


  }

  angular
    .module(ID.<%= capitalizedName %>Controller, [])
    .controller(ID.<%= capitalizedName %>Controller, <%= capitalizedName %>Controller);

}
