/// <reference path="../../../../<%= typingNesting %>typings/tsd.d.ts" />

module app.<%= namespace %>.<%= camelizedName %> {
  'use strict';

  /**
   * @name <%= capitalizedName %>Controller
   */
  export class <%= capitalizedName %>Controller extends helpers.ViewController {
    static $inject = [
      '$scope',
      services.utils.IID.EventHandlerUtilService
    ];

    public field;

    constructor($scope: I<%= capitalizedName %>Scope, eventHandlerUtil) {
      super($scope, eventHandlerUtil);
      this.init();
    }

    //region Public Methods
    //====================================================================================================
    public method(param: string) {
      return param;
    }
    //endregion
    //region Private Methods
    //====================================================================================================
    private init() {
      this.events();
    }

    private events() {
      this.addListener('event-key', (e) => { alert('Event fired!'); });
      this.fireEvent('event-key', { name: 'event-test' });
    }
    //endregion

  }

  angular
    .module(Namespace)
    .controller(IID.<%= capitalizedName %>Controller, <%= capitalizedName %>Controller);

}
