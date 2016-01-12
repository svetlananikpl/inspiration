/**
 * Created by Admin on 11.01.2016.
 */
module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    'app/**/*.js',
                    'app.js'
                ],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },

        uglify: {
            build: {
                src: 'dist/inspiration.js',
                dest: 'dist/inspiration.min.js'
            }
        },

        watch: {
            scripts: {
                files: ['app/**/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 3000,
                    base: 'dist'
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registerTask('default', ['connect', 'concat', 'uglify']);

};