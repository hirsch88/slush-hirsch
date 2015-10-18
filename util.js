'use strict';

var _     = require('underscore.string'),
    chalk = require('chalk'),
    path  = require('path');

module.exports = {
  format: format,
  defaults: defaults,
  hirschSayHi: hirschSayHi
};

/////////////////////////////////////////////////

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