/*jshint camelcase: false*/
'use strict';

module.exports = function(grunt) {

  grunt.registerTask('dev', 'watches for file changes and triggers build', function() {

    grunt.initConfig({
      watch: {
        js: {
          files: ['tasks/**/*.js', 'src/**/*.js', 'test/**/*.js', 'example/**/*.js', '!example/script.js' ],
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
