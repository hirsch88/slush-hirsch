/// <reference path="../../../../typings/tsd.d.ts"/>

module <%= appPrefix %>.home.controllers {
  'use strict';


  // INTERFACE ////////////////////////////////////////////////////////////////////
  interface IHomeScope {

  }


  // CONTROLLER ////////////////////////////////////////////////////////////////////
  class HomeController implements IHomeScope {
    static $inject = [
      core.config.ID.AppConfig
    ];

    // CONSTRUCTOR /////////////////////////////////////////////
    constructor(private config: core.config.AppConfig) {
      this.init();
    }


    // PUBLIC API /////////////////////////////////////////////


    // PRIVATE API ////////////////////////////////////////////
    private init() {
      console.log(this.config);
    }

  }

  angular
    .module(ID.HomeController, [
      core.config.ID.AppConfig
    ])
    .controller(ID.HomeController, HomeController);
}
