/// <reference path="../../../../<%= typingNesting %>typings/tsd.d.ts"/>

module <%= prefix %>.<%= module %>.<%= namespace %> {
  'use strict';

  export class <%= capitalizedName %>Model {<% for (var i = 0, p = modelProperties.length; i < p; i++) { %>
    <%= modelProperties[i].inAppName %>: <%= modelProperties[i].type %>;<% } %>

    constructor(response: any) {<% for (var i = 0, p = modelProperties.length; i < p; i++) { %>
      this.<%= modelProperties[i].inAppName %> = <% if (modelProperties[i].type === 'moment.Moment') { %>moment(<% } %>response['<%= modelProperties[i].inApiName %>']<% if (modelProperties[i].type === 'moment.Moment') { %>)<% } %>;<% } %>
    }

    mapDataForApi() {
      var data = {};<% for (var i = 0, p = modelProperties.length; i < p; i++) { %>
        data['<%= modelProperties[i].inApiName %>'] = this.<%= modelProperties[i].inAppName %><% if (modelProperties[i].type === 'moment.Moment') { %>.format('YYYY-mm-dd HH:MM:SS')<% } %>;<% } %>
      return data;
    }

  }


}