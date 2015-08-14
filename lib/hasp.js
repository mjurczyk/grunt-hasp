'use strict';

var child_process = require('child_process');
var rename = require('rename');

var gulputil = require('gulp-util');
var PluginError = gulputil.PluginError;

var haspBin = __dirname + '/hasp';

var escapePath = function (path) {
  return path.replace(/ /g, '\\ ');
};

module.exports = function (file, encoding, callback) {
  var context = this || arguments[arguments.length - 1];
  var filePath = file.path;
  var pluginName = context.pluginName;
  var haspProcess;
  
  if (typeof callback !== 'function') {
    callback = function () {}; 
  }
  
  if (file.isStream()) {
    return callback(new PluginError(pluginName, 'Streams are not supported'));
  }

  haspProcess = child_process.exec(
    escapePath(haspBin) + ' ' + escapePath(filePath) + ' >&1',
    function (err, stdout, stderr) {
      if (err) {
        return callback(new PluginError(pluginName, err.message));
      }

      if (stderr) {
        return callback(new PluginError(pluginName, stderr)); 
      }

      file.path = rename(file.path, {
        extname: '.css'
      });
      file.contents = new Buffer(stdout, encoding || 'utf8');

      callback(null, file);
    }
  );
};