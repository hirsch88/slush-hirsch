/// <reference path="../../../../<%= typingNesting %>typings/tsd.d.ts" />
<%= banner %>
module app.<%= namespace %> {
    'use strict';

  /**
   * @name I<%= capitalizedName %>Scope
   */
  interface I<%= capitalizedName %>Scope {
    method(param: string): string;
  }

  /**
   * @name <%= capitalizedName %>Controller
   */
  export class <%= capitalizedName %>Controller extends helpers.ViewController implements I<%= capitalizedName %>Scope{
    static $inject = [
      '$scope',
      services.utils.IID.EventHandlerUtilService
    ];

    public field;

    constructor($scope, eventHandlerUtil) {
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
