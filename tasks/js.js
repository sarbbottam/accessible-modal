/*jshint camelcase: false*/
'use strict';

module.exports = function(grunt) {

  grunt.registerTask('js', 'lint test & compile javascripts', function(target) {
    target = target || 'dev';
    grunt.initConfig({

      eslint: {
        options: {
          configFile: './eslint.json'
        },
        js: ['Gruntfile.js', 'tasks/*.js', 'src/*.js']
      },

      clean: ['coverage'],

      karma: {
        dev: {
          configFile: 'karma.conf.js'
        },
        ci: {
          configFile: 'karma.conf.js',
          browsers: ['PhantomJS'],
          coverageReporter: {
            reporters: [{
              type: 'lcov',
              dir: 'coverage/',
              subdir: '.'
            }, {
              type: 'json',
              dir: 'coverage/',
              subdir: '.',
              file: 'coverage.json'
            }]
          },
          junitReporter: {
            outputFile: 'test-results.xml',
            suite: ''
          }
        }
      }

    });

    grunt.task.run(['eslint', 'clean', 'karma:' + target]);

  });

};
