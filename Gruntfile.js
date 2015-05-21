'use strict';
var LIVERELOAD_PORT = 35728;
var SERVER_PORT = 3000;
var HOST_NAME = 'localhost';

module.exports = function (grunt) {

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                files: {
                    'styles/main.css':'styles/main.scss'
                }
            }
        },


        connect:{

            options:{
                port:SERVER_PORT,
                hostname:HOST_NAME,
                livereload:LIVERELOAD_PORT
            },

            livereload:{
                options:{
                    open:true
                }
            }
        },

        watch: {
            scss:{
                files:['styles/*.scss'],
                tasks:['sass:dist']
            },
            css:{
                files:['styles/*.css']
            },
            html:{
                files:['index.html']
            },
            jst:{
                files:['scripts/Templates/*.ejs'],
                tasks:['jst']
            },
            js:{
                files:['scripts/**/*.js',
                    '!scripts/templates.js',
                    'Gruntfile.js'],
                tasks:['jshint']
            },

            templates:{
                files:['scripts/templates.js']
            },

            options:{
                //livereload: '<%= connect.options.livereload %>'
            },
            livereload:{
                files:[
                    'styles/*.css',
                    '<%=watch.html.files%>',
                    '<%=watch.js.files%>',
                    '<%=watch.templates.files%>'
                ],
                options:{
                    livereload: '<%= connect.options.livereload %>'
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: ['<%=watch.js.files%>']
        },

        jst: {
            options: {
                amd: true
            },
            compile: {
                files: {
                    'scripts/templates.js': ['scripts/Templates/*.ejs']
                }
            }
        }
    });

    grunt.registerTask('serve', ['jshint','jst','sass','connect','watch']);
    grunt.registerTask('default',['serve']);
};
