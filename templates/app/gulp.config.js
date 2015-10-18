/**
 * Gulp Config
 * --------------------------------
 *
 *
 */

'use strict';

module.exports = {

  /**
   * PATHS
   * Defines the app-structure of this project
   */
  paths: {
    srcDir: 'src',
    distDir: 'dist',
    docsDir: 'docs',
    testDir: 'test',
    buildDir: 'build',
    taskDir: 'tasks',
    libDir: 'lib',
    appDir: 'app',
    assetsDir: 'assets',
    tempDir: '.tmp',
    main: 'index.html',
    mainTpl: 'index.tpl.html',
    assets: {
      configDir: 'assets/config',
      config: {
        environmentsDir: 'assets/config/environments'
      },
      cssDir: 'assets/css',
      css: 'assets/css/**/*.css',
      lessDir: 'assets/less',
      less: 'assets/less/**/*.less',
      lessMain: 'assets/less/main.less',
      sassDir: 'assets/scss',
      sass: 'assets/scss/**/*.scss',
      sassMain: 'assets/scss/main.scss',
      fontDir: 'assets/fonts',
      imagesDir: 'assets/images',
      i18nDir: 'assets/i18n',
      i18n: 'assets/i18n/**/*.json'
    },
    app: {
      util: 'app/util.ts',
      main: 'app/app.ts',
      modules: 'app/**/_*Module.ts',
      routes: 'app/**/*Routes.ts',
      configs: 'app/**/*Config.ts',
      constants: 'app/**/*.constant.ts',
      services: 'app/**/*Service.ts',
      directives: 'app/**/*Directive.ts',
      scripts: 'app/**/*.ts',
      templates: 'app/**/*.html',
      coreDir: 'app/core',
      commonDir: 'app/common',
      viewDir: 'app/views',
      layoutDir: 'app/layout',
      common: {
        serviceDir: 'app/common/services',
        filterDir: 'app/common/filters',
        templateDir: 'app/common/templates',
        directiveDir: 'app/common/directives',
        constantDir: 'app/common/constants',
        valueDir: 'app/common/values',
        configDir: 'app/common/configs'
      }
    }
  },

  /**
   * BANNER
   * The banner is the comment that is placed at the top of our compiled source files. It is first processed
   * as a Grunt template, where the pairs are evaluated based on this very configuration object.
   */
  banner: '/**\n' +
  ' * @name           <%= bannerAppName %>\n' +
  ' * @description    <%= bannerAppDescription %>\n\n' +
  ' * @version        <%= bannerAppVersion %>\n' +
  ' * @author         <%= bannerAppAuthor %>\n' +
  ' * @license        <%= bannerAppLicense %>\n' +
  ' */\n',

  /**
   * IGNORED STUFF
   */
  ignoredModules: [
    'core'
  ],

  ignoredBowerFiles: [
    'Materialize/bin/materialize.css'
  ]


};

