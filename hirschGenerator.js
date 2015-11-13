'use strict';

var gulp = require('gulp'),
  _ = require('underscore.string'),
  chalk = require('chalk'),
  inquirer = require('inquirer'),
  fs = require('fs'),
  path = require('path'),
  gitConfig = require('git-config'),
  lodash = require('lodash'),
  moment = require('moment'),
  conflict = require('gulp-conflict'),
  template = require('gulp-template'),
  rename = require('gulp-rename'),
  util = require('./util.js');

var hirschGenerator;

function HirschGenerator(name, targetDir, done) {
  /**
   * The name of the generator
   */
  this.name = name;
  /**
   * Says where to place the new file
   */
  this.targetDir = targetDir;
  /**
   * Has a copy of the gulp config paths
   */
  this.paths = {};
  /**
   * Path to the source folder where the templates are placed
   */
  this.sourceDir = '';
  /**
   * Path to place the new generated file
   */
  this.destinationDir = '';
  /**
   * Gulp done callback
   */
  this.done = done;
  /**
   * There are the commands saved
   */
  this.pipes = [];
  /**
   * Has the information for the template creation
   */
  this.context = {
    /**
     * Fix because of string templates are also used by lodash
     */
    Namespace: '${Namespace}',
    /**
     * Has the compiled file-header
     */
    banner: '',
    /**
     * NPM Configs
     */
    pkg: {},
    /**
     * Git configs of the user
     */
    git: {},
    /**
     * Gulp configs of the project
     */
    gulp: {},
    /**
     * Bower Components information
     */
    bower: {}
  }
  /**
   * This is default file header
   */
  defaultFileHeader: '/**\n' +
  ' * @name <%= name %>\n' +
  ' * @author <%= git.user.name %> (<%= git.user.email %>)\n' +
  ' * @date <%= date %>\n' +
  ' *\n' +
  ' * @description\n' +
  ' * <%= description %>\n' +
  ' */\n',
  /**
   * Default project paths
   */
  this.paths = {
    base: 'src',
    dist: 'dist',
    docsDir: 'docs',
    testDir: 'test',
    taskDir: 'tasks',
    libDir: 'lib',
    appDir: 'app',
    tempDir: '.tmp',
    main: 'index.html',
    mainTpl: 'index.tpl.html',
    assetsDir: 'assets',
    configDir: 'configs',
    cssDir: 'css',
    css: '**/*.css',
    js: '**/*.js',
    sassDir: 'scss',
    sass: '**/*.scss',
    sassMain: 'main.scss',
    fontDir: 'fonts',
    imagesDir: 'images',
    i18nDir: 'i18n',
    json: '**/*.json',
    app: {
      bootstrap: 'Bootstrap.ts',
      util: 'Util.ts',
      main: 'App.ts',
      modules: '**/*Module.ts',
      scripts: '**/*.ts',
      templates: '**/*.html',
      viewDir: 'views',
      layoutDir: 'layout',
      configDir: 'configs',
      modelDir: 'models',
      serviceDir: 'services',
      filterDir: 'filters',
      templateDir: 'templates',
      directiveDir: 'directives',
      componentDir: 'components'
    }
  },

  // Initial Pipe load
  this.pipes.push(this._loadGitConfig);
  this.pipes.push(this._welcomeDialog);

  if (this.name !== 'app') {
    this.pipes.push(this._loadAppConfigs);
    this.pipes.push(this._promptNameAndDesc);
    this.pipes.push(this._folderPrompt);
    this.pipes.push(this._definePaths);
    this.pipes.push(this._defineFileHeader);
  }

}

//region Public API
//====================================================================================================
HirschGenerator.prototype.pipe = function (newPipe) {
  this.pipes.push(newPipe);
  return this;
};

HirschGenerator.prototype.end = function (onEnd) {
  this._dispatch(onEnd);
};

HirschGenerator.prototype.prompt = function (prompts) {
  var _this = hirschGenerator;
  this.pipes.push(function (next) {
    for (var i = 0; i < prompts.length; i++) {
      if (prompts[i] && prompts[i].default) {
        var compiled = lodash.template(prompts[i].default);
        prompts[i].default = compiled(_this.context);
      }
    }
    inquirer.prompt(prompts, function (answers) {
      for (var key in answers) {
        if (answers.hasOwnProperty(key)) {
          _this.context[key] = answers[key];
        }
      }
      next();
    });
  });
  return this;
};

HirschGenerator.prototype.template = function (options) {
  var _this = hirschGenerator;
  this.pipes.push(_template);

  function _template(next) {
    if (options && !options.condition || options && options.condition && _this.context[options.condition]) {
      var compiled = lodash.template(options.fileName);
      options.fileName = compiled(_this.context);
      gulp.src(path.join(__dirname, _this.name, options.template))
        .pipe(template(_this.context))
        .pipe(rename(options.fileName))
        .pipe(conflict(_this.destinationDir))
        .pipe(gulp.dest(_this.destinationDir))
        .on('end', function () {
          util.onSuccess(_.capitalize(_this.name), path.join(_this.destinationDir, options.fileName));
          next();
        })
        .on('error', function () {
          util.onError(_.capitalize(_this.name), path.join(_this.destinationDir, options.fileName));
          next();
        });
    } else {
      console.log('TEMPLATE');
      next();
    }
  }
  return this;
};

HirschGenerator.prototype.copy = function (options) {
  var _this = hirschGenerator;
  this.pipes.push(_copy);

  function _copy(next) {
    if (options && !options.condition || options && options.condition && _this.context[options.condition]) {
      var compiled = lodash.template(options.fileName);
      options.fileName = compiled(_this.context);
      gulp.src(path.join(__dirname, _this.name, options.source))
        .pipe(rename(function (file) {
          if (file.basename[0] === '_') {
            file.basename = '.' + file.basename.slice(1);
          }
        }))
        .pipe(conflict(path.join(_this.destinationDir, options.target)))
        .pipe(gulp.dest(path.join(_this.destinationDir, options.target)))
        .on('end', function () {
          util.onSuccess(_.capitalize(_this.name), path.join(_this.destinationDir, options.target));
          next();
        })
        .on('error', function () {
          util.onError(_.capitalize(_this.name), path.join(_this.destinationDir, options.target));
          next();
        });
    } else {
      console.log('COPY');
      next();
    }
  }
  return this;
};
//endregion
//region Private API
//====================================================================================================
HirschGenerator.prototype._welcomeDialog = function (next) {
  var _this = hirschGenerator;
  util.hirschSayHiToUser(_this.name, _this.context.git.user.name);
  next();
}

HirschGenerator.prototype._loadAppConfigs = function (next) {
  var _this = hirschGenerator;
  _this.context.pkg = require(path.join(process.cwd(), 'package.json'));
  _this.context.gulp = require(path.join(process.cwd(), 'gulp.config.js'));
  _this.context.bower = require(path.join(process.cwd(), 'bower.json'));
  next();
}

HirschGenerator.prototype._promptNameAndDesc = function (next) {
  var _this = hirschGenerator;
  var prompts = [
    {
      name: 'name',
      message: 'What is the name of your ' + _this.name + '?'
    }, {
      name: 'description',
      message: 'Please add a short description:'
    }
  ];
  inquirer.prompt(prompts, function (answers) {
    _this.context.name = _.capitalize(answers.name) + _.capitalize(_this.name);
    _this.context.description = answers.description || 'TODO';
    _this.context.date = moment().format('DD-MM-YYYY');
    _this.context.slugedName = _.slugify(answers.name);
    _this.context.capitalizedName = _.capitalize(answers.name);
    _this.context.camelizedName = _.camelize(answers.name);
    _this.context.upperCaseName = answers.name.toUpperCase();
    _this.context.lowserCaseName = answers.name.toLowerCase();
    next();
  });
};

HirschGenerator.prototype._loadGitConfig = function (next) {
  var _this = hirschGenerator;
  gitConfig(function (err, config) {
    _this.context.git = config;
    next();
  });
};

HirschGenerator.prototype._folderPrompt = function (next) {
  var _this = hirschGenerator;

  var $default = util.fetchFromObject(_this.context.gulp.paths, _this.targetDir);
  if (!$default) {
    $default = util.fetchFromObject(_this.paths, _this.targetDir);
  }

  var prompts = [
    {
      name: 'folder',
      message: 'In which folder should the file be placed?',
      default: $default
    }
  ];
  inquirer.prompt(prompts, function (answers) {
    _this.context.path = answers.folder;
    _this.context.dirName = answers.folder.replace(/(\/|\\)/g, '/').replace(/(^\/|\/$)/g, '');
    _this.context.namespace = _this.context.dirName.replace(/\//g, '.');
    var levels = (_this.context.namespace.match(/\./g) || []).length;
    _this.context.typingNesting = '';
    while (levels--) {
      _this.context.typingNesting += '../';
    }
    next();
  });
};

HirschGenerator.prototype._definePaths = function (next) {
  var _this = hirschGenerator;
  _this.sourceDir = _this.name;
  _this.destinationDir = path.join(process.cwd(), _this.context.gulp.paths.base || '', _this.context.gulp.paths.appDir || '', _this.context.path || '');
  _this.context.paths = _this.paths;
  next();
};

HirschGenerator.prototype._defineFileHeader = function (next) {
  var _this = hirschGenerator;
  var compiled = lodash.template(_this.context.gulp.fileHeader || _this.fileHeader);
  _this.context.banner = compiled(_this.context);
  next();
};

HirschGenerator.prototype._dispatch = function (onEnd) {
  var _this = hirschGenerator;
  var idx = 0;
  var pipes = hirschGenerator.pipes;
  if (pipes.length === 0) {
    stop('Empty pipe collection!');
  }

  next();
  ////////////////////////////////////
  function stop(err) {
    _this.done(err)
    onEnd(err);
    return;
  }

  function next(err) {
    if (err) {
      return stop(err);
    }
    var pipe = pipes[idx++];
    if (!pipe) {
      return stop();
    }

    try {
      if (pipe && lodash.isFunction(pipe)) {
        pipe(next, stop);
      } else {
        return next();
      }
    } catch (err) {
      next(err);
    }
  }
};
//endregion

module.exports = function (name, targetDir, done) {
  hirschGenerator = new HirschGenerator(name, targetDir, done);
  return hirschGenerator;
};
