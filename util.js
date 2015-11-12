'use strict';

var chalk = require('chalk');

module.exports = {
  fetchFromObject: fetchFromObject,
  onSuccess: onSuccess,
  onError: onError,
  hirschSayHi: hirschSayHi
};

/////////////////////////////////////////////////
/**
 * Fetches a value by string from a object
 */
function fetchFromObject(obj, prop) {
  if (typeof obj === 'undefined') {
    return false;
  }
  var _index = prop.indexOf('.')
  if (_index > -1) {
    return fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index + 1));
  }
  return obj[prop];
}
/**
 * Prints a success message to the terminal
 */
function onSuccess(taskName, fileName) {
  console.log('[' + chalk.green(' ✔ ') + '] ' + taskName + ' ' + chalk.cyan(fileName) + ' created');
}
/**
 * Prints a error message to the terminal
 */
function onError(text) {
  console.log('[' + chalk.red(' X ') + '] ' + text);
}
/**
 * Hirsch says hi to the user over the terminal
 */
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


