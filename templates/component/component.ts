/// <reference path="../../../../<%= typingNesting %>typings/tsd.d.ts"/>

module <%= prefix %>.<%= module %>.<%= namespace %> {
    'use strict';

  // DIRECTIVE ////////////////////////////////////////////////////////////////////
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
  }<% if (hasController) { %>


  // INTERFACE ////////////////////////////////////////////////////////////////////
  export interface I<%= capitalizedName %>Scope {
  }

  // CONTROLLER ////////////////////////////////////////////////////////////////////
  class <%= capitalizedName %>Controller implements I<%= capitalizedName %>Scope {
    static $inject = [];

    constructor() {
      // TODO
    }

    // PUBLIC API /////////////////////////////////////////////


    // PRIVATE API /////////////////////////////////////////////


  }<% } %>

  angular
    .module(ID.<%= capitalizedName %>, [])
    .directive('<%= prefix %><%= capitalizedName %>', () => new <%= capitalizedName %>Directive())<% if (hasController) { %>
    .controller(ID.<%= capitalizedName %>Controller, <%= capitalizedName %>Controller)<% } %>;

}
