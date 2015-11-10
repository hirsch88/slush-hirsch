/// <reference path="../../../../<%= typingNesting %>typings/tsd.d.ts" />

/**
 * @name <%= capitalizedName %>Module
 * @author <%= gitConfig.user.name %> (<%= gitConfig.user.email %>)
 * @date <%= date %>
 */
module app.<%= namespace %> {
  'use strict';

  export const Namespace = 'app.<%= namespace %>';

  export const IID = {};

  angular
    .module(Namespace, [

    ]);

}
