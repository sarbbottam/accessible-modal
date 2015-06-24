/*jshint camelcase: false*/
'use strict';

module.exports = function(grunt) {

  grunt.registerTask('dev', 'watches for file changes and triggers build', function() {

    grunt.initConfig({
      watch: {
        js: {
          files: ['src/**/*.js', 'test/**/*.js'],
          tasks: ['js'],
          options: {
            livereload: true
          }
        }
      }
    });

    grunt.task.run('watch');

  });

};
