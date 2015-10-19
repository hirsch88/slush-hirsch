/// <reference path="../../../../<%= typingNesting %>typings/tsd.d.ts"/>

module <%= prefix %>.<%= module %>.<%= namespace %> {
    'use strict';

  // INTERFACE ////////////////////////////////////////////////////////////////////
  interface I<%= capitalizedName %> {
    method(param: string): string;
  }


  // SERVICE ////////////////////////////////////////////////////////////////////
  export class <%= capitalizedName %> implements I<%= capitalizedName %> {
    static $inject = [];

    private field;


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
    .module(ID.<%= capitalizedName %>, [])
    .service(ID.<%= capitalizedName %>, <%= capitalizedName %>);

}
