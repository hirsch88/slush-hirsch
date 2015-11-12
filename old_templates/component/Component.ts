/// <reference path="../../../../<%= typingNesting %>typings/tsd.d.ts"/>

module app.<%= namespace %> {
    'use strict';

  //region Directive Class
  //====================================================================================================
  class <%= capitalizedName %>Directive implements angular.IDirective {
    restrict = 'E';
    templateUrl = '<%= templateUrl %>';<% if (hasController) { %>
    controller = ID.<%= capitalizedName %>Controller;
    controllerAs = 'vm';
    bindToController = true;<% } %><% if (hasLinkFnc) { %>

    link = (scope: angular.IScope,
            instanceElement: angular.IAugmentedJQuery,
            instanceAttributes: angular.IAttributes<% if (hasController) { %>,
       controller: <%= capitalizedName %>Controller<% } %>) => {
        // TODO: link logic
      };<% } %>
  }
  //endregion
  <% if (hasController) { %>
  //region Directive Controller
  //====================================================================================================
  export interface I<%= capitalizedName %>Scope {
  }

  class <%= capitalizedName %>Controller implements I<%= capitalizedName %>Scope {
    static $inject = [];

    constructor() {
      // TODO
    }

    //region Public Api
    //====================================================================================================

    //endregion
    //region Private Api
    //====================================================================================================

    //endregion

  }
  //endregion
  <% } %>

  angular
    .module(Namespace)
    .directive('<%= prefix %><%= capitalizedName %>', () => new <%= capitalizedName %>Directive())<% if (hasController) { %>
    .controller(IID.<%= capitalizedName %>Controller, <%= capitalizedName %>Controller)<% } %>;

}
