module.exports = function(grunt) {
    grunt.initConfig({
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({
                        browsers: 'last 2 versions'
                    })
                ]
            },
            src: {
                src: 'dist/styles/*.css'
            },
            nano: {
                options: {
                    map: true,
                    processors: [
                        require('cssnano')
                    ]
                },
                files: [{
                    expand: true,
                    cwd: 'dist/styles',
                    src: ['*.css'],
                    dest: './dist/styles',
                    ext: '.min.css'
                }]
            }
        },
        sass: {
            options: {
                style: "expanded",
                sourcemap: "none"
            },
            src: {
                files: [{
                    expand: true,
                    cwd: 'src/styles',
                    src: ['*.scss'],
                    dest: './dist/styles',
                    ext: '.css'
                }]
            }
        },
        watch: {
            src: {
                files: ['src/styles/**/*.scss'],
                tasks: ['compile']
            }
        },
    });

    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', []);

    grunt.registerTask('compile', ['sass:src', 'postcss:src', 'postcss:nano']);
    grunt.registerTask('dev', ['watch:src']);
};
