/// <reference path="../../../<%= typingNesting %>typings/tsd.d.ts"/>
<%= banner %>
module app.<%= namespace %> {
  'use strict';

  var <%= capitalizedName %>Filter = () => (input, format) => {
    return input.format(format);
  };

  angular
    .module(Namespace)
    .filter(IID.<%= capitalizedName %>Filter, <%= capitalizedName %>Filter);

}
