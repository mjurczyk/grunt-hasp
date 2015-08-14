'use strict';

module.exports = function (grunt) {
  grunt.loadTasks('../tasks');
  
  grunt.initConfig({
    hasp: {
      options: {},
      testSrcDest: {
        src: ['input/*.hcss'],
        dest: 'output/'
      },
      testFiles: {
        files: {
          'output/': 'input/*.hcss'
        }
      }
    }
  });
  
  grunt.registerTask('default', ['hasp']);
  grunt.registerTask('haspSrcDest', ['hasp:testSrcDest']);
  grunt.registerTask('haspFiles', ['hasp:testFiles']);
};
