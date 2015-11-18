/// <reference path="../../../../<%= typingNesting %>typings/tsd.d.ts"/>
<%= banner %>
module app.<%= namespace %>.<%= camelizedName %> {
  'use strict';

  export const Namespace = 'app.<%= namespace %>.<%= camelizedName %>';

  export const IID = {
    <%= capitalizedName %>Controller: `${Namespace}.<%= capitalizedName %>Controller`
  };

  angular
    .module(Namespace, []);

}
