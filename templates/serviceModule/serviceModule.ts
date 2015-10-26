/// <reference path="../../../<%= typingNesting %>typings/tsd.d.ts" />

module <%= prefix %>.<%= module %>.<%= namespace %> {
    'use strict';

export var Namespace = '<%= prefix %>.<%= module %>.<%= namespace %>';

export var ID = {
  <% _.forEach(modules, function(module, index) { %><% if (index + 1 < modules.length ) { %><%- module %>: `<%= Namespace %>.<%= module %>`,<% } %><% if (index + 1 === modules.length ) { %><%- module %>: `<%= Namespace %>.<%= module %>`<% } %>
  <% }); %>
};

angular
  .module(Namespace, [
    <% _.forEach(modules, function(module, index) { %><% if (index + 1 < modules.length ) { %>ID.<%= module %>, <% } %><% if (index + 1 === modules.length ) { %>ID.<%= module %> <% } %>
    <% }); %>
  ]);

}