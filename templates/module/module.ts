/// <reference path="../../../<%= typingNesting %>typings/tsd.d.ts" />

module <%= prefix %>.<%= namespace %> {
  'use strict';

  export var Namespace = '<%= prefix %>.<%= namespace %>';

  export var ID = {};

  angular
    .module(Namespace, []);

}