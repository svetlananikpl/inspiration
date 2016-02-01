/**
 * Created by Admin on 11.01.2016.
 */
module.exports = function (grunt) {

    grunt.initConfig({

            pkg: grunt.file.readJSON('package.json'),

            useminPrepare: {
                html: 'app/index.html'
            },

            copy: {
                html: {
                    files: [{
                        cwd: 'app',  // set working folder / root to copy
                        src: ['**/*.html'],      // copy all files and subfolders with ending .html
                        dest: 'dist',    // destination folder
                        expand: true           // required when using cwd
                    }]
                },
                json: {
                    files: [{
                        cwd: 'app',  // set working folder / root to copy
                        src: ['**/*.json'],      // copy all files and subfolders with ending .html
                        dest: 'dist',    // destination folder
                        expand: true           // required when using cwd
                    }]
                }
            },

            filerev: {
                options: {
                    encoding: 'utf8',
                    algorithm: 'md5',
                    length: 20
                },
                source: {
                    files: [{
                        src: [
                            'dist/scripts/*.js',
                            'dist/styles/*.css'
                        ]
                    }]
                }
            },

            clean: {
                build: ['dist', '.tmp']
            },

            usemin: {
                html: ['dist/index.html']
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
                        base: 'dist',
                        keepalive: true
                    }
                }
            }

        }
    )
    ;

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-filerev');

    grunt.registerTask('build', [
        'clean',
        'copy:html',
        'copy:json',
        'useminPrepare',
        'concat:generated',
        'cssmin:generated',
        'uglify:generated',
        'filerev',
        'usemin'
    ]);

    grunt.registerTask('server', ['connect']);


}
;