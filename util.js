'use strict';

var _         = require('underscore.string'),
    chalk     = require('chalk'),
    inquirer  = require('inquirer'),
    fs        = require('fs'),
    path      = require('path'),
    gitConfig = require('git-config'),
    moment    = require('moment');

module.exports = {
  getPkg: getPkg,
  getGitConfig: getGitConfig,
  getPaths: getPaths,
  getGulpConfig: getGulpConfig,
  format: format,
  defaults: defaults,
  hirschSayHi: hirschSayHi,
  buildContext: buildContext,
  folderPrompt: folderPrompt,
  modulePrompt: modulePrompt,
  convertModuleToPath: convertModuleToPath,
  convertPathToModule: convertPathToModule,
  onSuccess: onSuccess,
  onError: onError
};

/////////////////////////////////////////////////

function getGitConfig(done) {
  gitConfig(function (err, config) {
    done({
      gitConfig: config
    });
  });
}

function getGulpConfig() {
  return require(path.join(process.cwd(), 'gulp.config.js'));
}

function getPaths(templateName, files) {
  var source = [];
  for (var i = 0; i < files.length; i++) {
    source.push(path.join(__dirname, 'templates/' + templateName + '/**.' + files[i]));
  }
  return {
    source: source,
    target: './src/app'
  };
}

function onSuccess(taskName, fileName) {
  console.log('[' + chalk.green(' ✔ ') + '] ' + taskName + ' ' + chalk.cyan(fileName) + ' created');
}

function onError(text) {
  console.log('[' + chalk.red(' X ') + '] ' + text);
}

function folderPrompt($default, cb) {
  var prompts = [{
    name: 'folder',
    message: 'In which folder should the file be placed?',
    default: $default
  }];
  inquirer.prompt(prompts, function (answers) {
    var o = {};
    o.path = answers.folder;
    o.dirName = answers.folder.replace(/(\/|\\)/g, '/').replace(/(^\/|\/$)/g, '');
    o.namespace = o.dirName.replace(/\//g, '.');
    var levels = (o.namespace.match(/\./g) || []).length;
    o.typingNesting = '';
    while (levels--) {
      o.typingNesting += '../';
    }
    cb(o);
  });
}


function modulePrompt(cb) {
  getModulesFromFileStructure(function (modules) {
    var $default = modules.indexOf('common');
    $default = $default < 0 ? 0 : $default;
    var prompts = [{
      type: 'list',
      name: 'choosenModule',
      message: 'Choose a module?',
      choices: modules,
      default: $default
    }];
    inquirer.prompt(prompts, function (answers) {
      cb(answers.choosenModule);
    });
  });
}

function getModulesFromFileStructure(done) {
  var config = getGulpConfig();
  fs.readdir('./src/app', function (err, files) {
    if (files) {
      var modules = [];
      for (var i = 0; i < files.length; i++) {
        if (files[i].indexOf('.') === -1) {
          if (config.ignoredModules.indexOf(files[i]) === -1) {
            modules.push(files[i]);
          }
        }
      }
      done(modules);
    } else {
      done([]);
    }
  });
}

function convertModuleToPath(module) {
  return module.split('.').join('/');
}

function convertPathToModule(path) {
  return path.split('/').join('.');
}

function getPkg() {
  return require(path.join(process.cwd(), 'package.json'));
}

function buildContext(arr) {
  var context = {};
  context.typingNesting = '';
  context.Namespace = '${Namespace}';
  var pkg = getPkg();
  for (var i in pkg) {
    if (pkg.hasOwnProperty(i)) {
      context[i] = pkg[i];
    }
  }

  for (var n = 0; n < arr.length; n++) {
    for (var i in arr[n]) {
      if (arr[n].hasOwnProperty(i)) {
        context[i] = arr[n][i];
      }
    }
  }

  context.description = context.description || '//TODO';
  context.date = moment().format('DD-MM-YYYY');
  context.slugedName = _.slugify(context.name);
  context.capitalizedName = _.capitalize(context.name);
  context.camelizedName = _.camelize(context.name);
  return context;
}


function format(string) {
  var username = string.toLowerCase();
  return username.replace(/\s/g, '');
}

function defaults() {
  return (function () {
    var workingDirName = path.basename(process.cwd()),
        homeDir, osUserName, configFile, user;
    if (process.platform === 'win32') {
      homeDir = process.env.USERPROFILE;
      osUserName = process.env.USERNAME || path.basename(homeDir).toLowerCase();
    } else {
      homeDir = process.env.HOME || process.env.HOMEPATH;
      osUserName = homeDir && homeDir.split('/').pop() || 'root';
    }
    configFile = path.join(homeDir, '.gitconfig');
    user = {};
    if (require('fs').existsSync(configFile)) {
      user = require('iniparser').parseSync(configFile).user;
    }
    return {
      appName: workingDirName,
      userName: osUserName || format(user.name || ''),
      authorName: user.name || '',
      authorEmail: user.email || ''
    };
  })();
}

function hirschSayHi() {
  var icon = '';
  icon += '\n';
  icon += chalk.bold.grey('     /|        |\\                   \n');
  icon += chalk.bold.grey('  `__\\\\        //__\'              \n');
  icon += chalk.bold.grey('      ||      ||') + '         .---------------.     \n';
  icon += chalk.bold.grey('    \\__`\\     |\'__/') + '      |     ' + chalk.blue('happy') + '     |     \n';
  icon += chalk.bold.grey('      `_\\\\   //_\ ') + '        |   ' + chalk.bold('<') + chalk.bold.red('CODING') + chalk.bold('/> ') + '  |     \n';
  icon += '      _.,:---;,._        \'---------------\'    \n';
  icon += '      \\_:     :_/                              \n';
  icon += '        |@. .@|                                 \n';
  icon += '        |     |                                 \n';
  icon += '         \\.-./            \n';
  icon += '          `-\'             \n';

  icon += '\n';
  icon += '> Go to your project folder and run ' + chalk.bold.yellow('gulp serve\n');
  icon += '> Then visit your app on ' + chalk.bold.yellow('http://localhost:3000\n');
  icon += '\n';

  return icon;
}