/// <reference path="../../../../<%= typingNesting %>typings/tsd.d.ts"/>

module <%= prefix %>.<%= module %>.<%= namespace %> {
  'use strict';

// FILTER ////////////////////////////////////////////////////////////////////
  var <%= capitalizedName %>Filter = () => (input, format) => {
    return input.format(format);
  };

  angular
    .module(ID.<%= capitalizedName %>Filter, [])
    .filter(ID.<%= capitalizedName %>Filter, <%= capitalizedName %>Filter);

}