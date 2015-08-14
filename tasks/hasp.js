'use strict';

var haspTransform = require(__dirname + '/../lib/hasp.js');

var grunt = null;
var transforms = [];
var pluginName = 'grunt-hasp-css';
var context = {
  pluginName: pluginName
};
var gulputil = require('gulp-util');
var File = gulputil.File;
var path = require('path');

var validateFile = function (path) {
  return grunt.file.exists(path);
};

var readFileContents = function (path) {
  return grunt.file.read(path);
};

var testReady = function () {
  return transforms.reduce(function (prev, curr) {
    return prev && curr;
  });
};

module.exports = function (_grunt) {
  grunt = _grunt;
  
  grunt.registerMultiTask('hasp', 'hasp CSS precompiler', function () {
    var files = this.files;
    var done = this.async();
    
    grunt.log.ok('HASP starting.');
    
    files.forEach(function (file) {   
      file.src.filter(validateFile)
      .forEach(function (filepath) {
        var vinylFile = new File({
          cwd: __dirname,
          path: filepath,
          contents: new Buffer(grunt.file.read(filepath))
        });
        var transformId = transforms.length;
        
        haspTransform(vinylFile, null, function (error, result) {
          grunt.log.writeln('HASP compiling ' + filepath.green + '.');
          
          if (error) {
            grunt.fail.fatal(error.message);
            throw new Error(error);
          }
          
          grunt.file.write(file.dest + path.basename(result.path), result.contents);
          
          transforms[transformId] = true;
          
          if (testReady()) {
            grunt.log.ok('HASP files compiled.');
            done(); 
          }
        }, context);
        
        transforms.push(false);
      });
    });
  });
};
