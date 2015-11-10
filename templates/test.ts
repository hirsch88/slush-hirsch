/// <reference path="../../../../<%= typingNesting %>typings/tsd.d.ts"/>

module <%= prefix %>.<%= module %>.<%= namespace %> {
    'use strict';

// Global Services
//var service;

/**
 * Static Public API
 * @description
 * This will be used to create or load models from the backend
 */
export interface I<%= capitalizedName %>ModelStatic {
  EVENTS: IModelEvents;
  new(any): <%= capitalizedName %>Model;
  /**
   * Returns all entities
   */
  getAll(): Promise<<%= capitalizedName %>Model[]>;
  /**
   * Returns the entity with the given id
   */
  get(id:string): Promise<<%= capitalizedName %>Model>;
}

/**
 * Defines the models public api
 */
export interface I<%= capitalizedName %>Model {

}

/**
 * Defines the backend structure
 */
export interface I<%= capitalizedName %>BackendStructure {<% for (var i = 0, p = modelProperties.length; i < p; i++) { %>
  <%= modelProperties[i].inApiName %>: <% if (modelProperties[i].type === 'moment.Moment') { %>string<% } else {%><%=modelProperties[i].type%>;<% } %><% } %>
}

export class <%= capitalizedName %>Model {<% for (var i = 0, p = modelProperties.length; i < p; i++) { %>
public static EVENTS: IModelEvents = <IModelEvents>{
    CREATED: `${ID.<%= capitalizedName %>Model.toLowerCase()}.events.created`,
    UPDATED: `${ID.<%= capitalizedName %>Model.toLowerCase()}.events.updated`,
    DESTROYED: `${ID.<%= capitalizedName %>Model.toLowerCase()}.events.destroyed`
  };

  <%= modelProperties[i].inAppName %>: <%= modelProperties[i].type %>;<% } %>

  // PUBLIC STATIC API ///////////////////////////////////////////////////////
public static getAll() {
    //TODO
    ;
  }

public static get(id: string) {
    //TODO
    ;
  }

  // CONSTRUCTOR ///////////////////////////////////////////////////////
  constructor(response) {
    this.convertResponse(response);
  }

  // PUBLIC API ///////////////////////////////////////////////////////
  save() {
    //TODO
    ;
  }

  destroy() {
    //TODO
    ;
  }

  // PRIVATE API ///////////////////////////////////////////////////////
private convertForRequest() {
    var requestBody: I<%= capitalizedName %>BackendStructure  = <I<%= capitalizedName %>BackendStructure>{};<% for (var i = 0, p = modelProperties.length; i < p; i++) { %>
      requestBody.<%= modelProperties[i].inApiName %> = this.<%= modelProperties[i].inAppName %><% if (modelProperties[i].type === 'moment.Moment') { %>.format('YYYY-mm-dd HH:MM:SS')<% } %>;<% } %>
    return requestBody;
  }

private convertResponse(response: I<%= capitalizedName %>BackendStructure) {<% for (var i = 0, p = modelProperties.length; i < p; i++) { %>
    this.<%= modelProperties[i].inAppName %> = <% if (modelProperties[i].type === 'moment.Moment') { %>moment(<% } %>response.<%= modelProperties[i].inApiName %><% if (modelProperties[i].type === 'moment.Moment') { %>)<% } %>;<% } %>
  }

}

}
