/// <reference path="../../../../<%= typingNesting %>typings/tsd.d.ts"/>

module app.<%= namespace %>.<%= camelizedName %> {
    'use strict';

  /**
   * @name I<%= capitalizedName %>Scope
   */
  interface I<%= capitalizedName %>Scope extends angular.IScope {
    method(param: string): string;
  }

  /**
   * @name <%= capitalizedName %>Directive
   */
  class <%= capitalizedName %>Directive implements angular.IDirective {
    restrict = 'E';

    template = '<h1>This is <%= capitalizedName %>Directive!</h1>';

    scope = {};<% if (hasController) { %>
    controller = IID.<%= capitalizedName %>Controller;
    controllerAs = '<%= camelizedName %>';
    bindToController = true;<% } %><% if (hasLinkFnc) { %>

    link = (scope: I<%= capitalizedName %>Scope,
            instanceElement: angular.IAugmentedJQuery,
            instanceAttributes: angular.IAttributes<% if (hasController) { %>,
            controller: <%= capitalizedName %>Controller<% } %>) => {

      // TODO: link logic

    };<% } %>
  }

  angular
    .module(Namespace)
    .directive('<%= pkg.prefix %><%= capitalizedName %>', () => new <%= capitalizedName %>Directive());

}
