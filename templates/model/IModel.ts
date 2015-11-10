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

  /**
   * @name I<%= capitalizedName %>ModelStatic
   * @description
   * This will be used to create or load models from the backend. Moreover
   * static variables are used to store global configs of the models
   */
  export interface I<%= capitalizedName %>ModelStatic extends IBaseStaticModel {
    /**
     * Gives the model a Independent and Identically Distributed name
     */
    IID: string;
    /**
     * Defines the events for this model
     */
    EVENTS: I<%= capitalizedName %>ModelEvents;
    /**
     * This static variable stores the defaults
     */
    DEFAULTS: I<%= capitalizedName %>ModelBackend;
    /**
     * Creates and returns a new Model instance
     */
    new (any): I<%= capitalizedName %>Model;
  }

  /**
   * @name I<%= capitalizedName %>Model
   * @description
	 * Defines the data structure of the model and
   * some behaviour methods
	 */
	export interface I<%= capitalizedName %>Model {<% for (var i = 0, p = modelProperties.length; i < p; i++) { %>
		<%= modelProperties[i].inAppName %>?: <%= modelProperties[i].type %>;<% } %>

    save(): Promise<I<%= capitalizedName %>Model>;
		destroy(): Promise<any>;
  }

  /**
   * @name I<%= capitalizedName %>ModelBackend
   * @description
	 * Defines the backend structure
	 */
	export interface I<%= capitalizedName %>ModelBackend {<% for (var i = 0, p = modelProperties.length; i < p; i++) { %>
		<%= modelProperties[i].inApiName %>?: <% if (modelProperties[i].type === 'moment.Moment') { %>string <% } else {%><%=modelProperties[i].type %>;<% } %><% } %>
	}

  /**
   * @name I<%= capitalizedName %>ModelEvents
   * @description
   * This interface defines the model events which can
   * be listend at
   */
  export interface I<%= capitalizedName %>ModelEvents {
    CREATED: string;
    UPDATED: string;
    DESTROYED: string;
  }

  /**
   * @name I<%= capitalizedName %>ModelFactory
   * @description
	 * Defines the model factory. This is used to access the model
   * throw the angular system
	 */
  export interface I<%= capitalizedName %>ModelFactory {
		getModel(): I<%= capitalizedName %>ModelStatic;
		create(data?): I<%= capitalizedName %>Model;
  }

}
