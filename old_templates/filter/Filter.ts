/// <reference path="../../../<%= typingNesting %>typings/tsd.d.ts"/>

/**
 * @name I<%= capitalizedName %>Model
 * @author <%= gitConfig.user.name %> (<%= gitConfig.user.email %>)
 * @date <%= date %>
 *
 * @description
 * <%= description %>
 */
module app.<%= namespace %> {
  'use strict';

  var <%= capitalizedName %>Filter = () => (input, format) => {
    return input.format(format);
  };

  angular
    .module(Namespace)
    .filter(IID.<%= capitalizedName %>Filter, <%= capitalizedName %>Filter);

}