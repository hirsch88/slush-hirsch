/// <reference path="../../../../typings/tsd.d.ts"/>

module <%= appPrefix %>.home.controllers {
  'use strict';


  // INTERFACE ////////////////////////////////////////////////////////////////////
  interface IHomeScope {

  }


  // CONTROLLER ////////////////////////////////////////////////////////////////////
  class HomeController implements IHomeScope {
    static $inject = [];

    // CONSTRUCTOR /////////////////////////////////////////////
    constructor() {
      this.init();
    }


    // PUBLIC API /////////////////////////////////////////////


    // PRIVATE API ////////////////////////////////////////////
    private init() {
      ;
    }

  }

  angular
    .module(ID.HomeController, [
    ])
    .controller(ID.HomeController, HomeController);
}
