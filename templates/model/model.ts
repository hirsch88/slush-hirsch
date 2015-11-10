/// <reference path="../../../<%= typingNesting %>typings/tsd.d.ts"/>

/**
 * @name I<%= capitalizedName %>Model
 * @author <%= gitConfig.user.name %> (<%= gitConfig.user.email %>)
 * @date <%= date %>
 */
module app.<%= namespace %> {
  'use strict';

  // Global Services
  let httpUtilService: services.utils.IHttpUtilService,
      eventHandlerUtilService: services.utils.IEventHandlerUtilService;

  /**
   * @name <%= capitalizedName %>Model
   */
  export class <%= capitalizedName %>Model implements I<%= capitalizedName %>Model {

    //region Public Static Variables
    //====================================================================================================
    public static IID: string = 'app.<%= namespace %>.<%= capitalizedName %>Model';

    public static EVENTS: I<%= capitalizedName %>ModelEvents = <I<%= capitalizedName %>ModelEvents>{
      CREATED: <%= capitalizedName %>Model.IID + '.events.created',
      UPDATED: <%= capitalizedName %>Model.IID + '.events.updated',
      DESTROYED: <%= capitalizedName %>Model.IID + '.events.destroyed'
    };

    public static DEFAULTS: I<%= capitalizedName %>ModelBackend = <I<%= capitalizedName %>ModelBackend> {<% for (var i = 0, p = modelProperties.length; i < p; i++) { %>
      <%= modelProperties[i].inAppName %>: undefined<% if(i < modelProperties.length-1){ %>,<% } %><% } %>
    }
    //endregion
    //region Public Variables
    //====================================================================================================<% for (var i = 0, p = modelProperties.length; i < p; i++) { %>
    <%= modelProperties[i].inAppName %>: <%= modelProperties[i].type %>;<% } %>

    //endregion
    //region Public Static Api
    //====================================================================================================
    // public static getAll() {
    //   //TODO
    //   ;
    // }

    // public static get(id: string) {
    //   //TODO
    //   ;
    // }
    //endregion

    constructor(response) {
      this.convertResponse(response);
    }

    //region Public Api
    //====================================================================================================
    public save() {
      //var requestBody = this.convertForRequest();
      //TODO
      return undefined;
    }

    public destroy() {
      //TODO
      return undefined;
    }
    //endregion
    //region Private Api
    //====================================================================================================
    //private convertForRequest(): <I<%= capitalizedName %>ModelBackend> {
    //  var requestBody: I<%= capitalizedName %>ModelBackend  = <I<%= capitalizedName %>ModelBackend>{};<% for (var i = 0, p = modelProperties.length; i < p; i++) { %>
    //  requestBody.<%= modelProperties[i].inApiName %> = this.<%= modelProperties[i].inAppName %><% if (modelProperties[i].type === 'moment.Moment') { %>.format('YYYY-mm-dd HH:MM:SS')<% } %>;<% } %>
    //  return requestBody;
    //}

    private convertResponse(response: I<%= capitalizedName %>ModelBackend) {<% for (var i = 0, p = modelProperties.length; i < p; i++) { %>
      this.<%= modelProperties[i].inAppName %> = <% if (modelProperties[i].type === 'moment.Moment') { %>moment(<% } %>response.<%= modelProperties[i].inApiName %><% if (modelProperties[i].type === 'moment.Moment') { %>)<% } %>;<% } %>
    }
    //endregion

  }

  //region Model Factory
  //===========================================================================================
  var <%= capitalizedName %>ModelFactory = (_eventHandlerUtilService: services.utils.IEventHandlerUtilService,
    _httpUtilService: services.utils.IHttpUtilService) => {
    // Sets global var with the needed services
    eventHandlerUtilService = _eventHandlerUtilService;
    httpUtilService = _httpUtilService;
    // Defines the factorys output
    let factory: I<%= capitalizedName %>ModelFactory = {
      getModel: () => <I<%= capitalizedName %>ModelStatic><%= capitalizedName %>Model,
      create: (data?) => new <%= capitalizedName %>Model(data)
    };
    return factory;
  };
  <%= capitalizedName %>ModelFactory.$inject = <any>[
    services.utils.IID.HttpUtilService,
    services.utils.IID.EventHandlerUtilService
  ];
  //endregion

  angular
    .module(Namespace)
    .factory(IID.<%= capitalizedName %>ModelFactory, <%= capitalizedName %>ModelFactory);

}
