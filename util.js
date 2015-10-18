'use strict';

var _        = require('underscore.string'),
    chalk    = require('chalk'),
    inquirer = require('inquirer'),
    path     = require('path');

module.exports = {
  getPkg: getPkg,
  getPaths: getPaths,
  getGulpConfig: getGulpConfig,
  format: format,
  defaults: defaults,
  hirschSayHi: hirschSayHi,
  buildContext: buildContext,
  folderPrompt: folderPrompt,
  convertModuleToPath: convertModuleToPath,
  convertPathToModule: convertPathToModule,
  onSuccess: onSuccess
};

/////////////////////////////////////////////////

function getPaths(templateName) {
  return {
    source: path.join(__dirname, 'templates/' + templateName + '.ts'),
    target: './src/app'
  };
}

function onSuccess(taskName, fileName) {
  console.log('');
  console.log(chalk.green('✔ ') + taskName + ' ' + chalk.green(fileName) + ' created');
  console.log('');
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

function convertModuleToPath(module) {
  return module.split('.').join('/');
}

function convertPathToModule(path) {
  return path.split('/').join('.');
}

function getPkg() {
  return require(path.join(process.cwd(), 'package.json'));
}

function getGulpConfig() {
  return require(path.join(process.cwd(), 'gulp.config.js'));
}

function buildContext(answers, folder) {
  var context = {};
  context.typingNesting = '';
  context.Namespace = '${Namespace}';
  var pkg = getPkg();
  for (var i in pkg) {
    if (pkg.hasOwnProperty(i)) {
      context[i] = pkg[i];
    }
  }
  for (var i in answers) {
    if (answers.hasOwnProperty(i)) {
      context[i] = answers[i];
    }
  }
  for (var i in folder) {
    if (folder.hasOwnProperty(i)) {
      context[i] = folder[i];
    }
  }
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