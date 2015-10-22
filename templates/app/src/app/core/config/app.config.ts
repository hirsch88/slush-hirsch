/// <reference path="../../../../typings/tsd.d.ts" />

module <%= prefix %>.core.config {
  'use strict';

  export class AppConfig {
    /**
     *  Returns the backend url for the right environemnt.
     *  To get the environment, we anlyse the url from our borwser.
     */
    backendUrl: string;

    /**
     * Returns which environment the app is currently running in.
     */
    environment: string;

    /**
     * Returns the default language
     */
    language: string;

    /**
     * Some API static configs
     */
    'client_id': string;
    'client_secret': string;

  }

  // this is an empty configuration object that is provided
  // as a default in case no other config was provided; can
  // be used e.g. for tests
  var emptyConfig: AppConfig = {
    backendUrl: '',
    environment: '',
    language: '',
    'client_id': '',
    'client_secret': ''
  };

  angular.module(ID.AppConfig, [])
    .constant(ID.AppConfig, emptyConfig);
}
