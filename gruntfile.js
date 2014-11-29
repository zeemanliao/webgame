
module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    var src = ['test/*.js'];
    // Project configuration.
    grunt.initConfig({
    		pkg: grunt.file.readJSON('package.json'),
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    timeout: 5000,
                    require: 'coverage/blanket'
                },
                src: src
            },
            coverage: {
                options: {
                    reporter: 'html-cov',
                    quiet: true,
                    captureFile: 'coverage.html'
                },
                src: src
            }
        },
        clean: {
            "coverage.html": {
                src: ['coverage.html']
            }
        },
        jshint: {
            all: ['lib/*']
        }
    });
    // Default task.
    grunt.registerTask('default', ['clean', 'mochaTest', 'jshint']);
};
