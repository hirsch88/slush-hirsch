/**
 * Gulp Config
 * --------------------------------
 * This config stores all the gulp related infromation like pahts or
 * ignored modules
 *
 */

'use strict';

module.exports = {

  /**
   * TYPESCRIPT
   * Defines the compiler configurations
   */
  typescript: {
    noImplicitAny: false,
    removeComments: true,
    noEmitOnError: true,
    preserveConstEnums: true,
    sourceMap: false,
    declaration: false,
    noResolve: true,
    target: 'es5'
  },

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
      configDir: 'assets/configs',
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
      bootstrap: 'app/bootstrap.js',
      util: 'app/util.js',
      main: 'app/app.js',
      modules: 'app/**/_*.module.js',
      routes: 'app/**/*.routes.js',
      configs: 'app/**/*.config.js',
      constants: 'app/**/*.constant.js',
      services: 'app/**/*.service.js',
      components: 'app/**/*.component.js',
      scripts: 'app/**/*.js',
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
  ],

  fonts: [
    'src/lib/font-awesome/fonts/FontAwesome.otf',
    'src/lib/font-awesome/fonts/fontawesome-webfont.eot',
    'src/lib/font-awesome/fonts/fontawesome-webfont.svg',
    'src/lib/font-awesome/fonts/fontawesome-webfont.ttf',
    'src/lib/font-awesome/fonts/fontawesome-webfont.woff',
    'src/lib/font-awesome/fonts/fontawesome-webfont.woff2'
  ]


};

