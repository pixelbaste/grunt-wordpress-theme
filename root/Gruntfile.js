module.exports = function(grunt) {
    

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                report: 'min',
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            target: {
            files: [{
                  expand: true,
                  cwd: '{%= distribution_path %}/{%= js_safe_name %}/_/js/pre-min',
                  src: '**/*.js',
                  dest: '{%= distribution_path %}/{%= js_safe_name %}/_/js/'
              }]
            }
        },
        compass: {                  // Task
            dev: {                    // Another target
                    options: {
                        sassDir: 'sass',
                        cssDir: '{%= distribution_path %}/{%= js_safe_name %}/_/css',
                        environment: 'development'
                    }
                },
            dist: {                    // Another target
                options: {
                    sassDir: 'sass',
                    cssDir: '{%= distribution_path %}/{%= js_safe_name %}/_/css',
                    environment: 'production',
                    outputStyle: 'compressed',
                    force: true
                }
            }
        },
        csslint: {
          lax: {
            options: {
              import: 2,
              "box-sizing": false,
              "ids": false,
              "star-property-hack": false,
              "universal-selector": false,
              "adjoining-classes": false
            },
            src: ['{%= distribution_path %}/{%= js_safe_name %}/_/css/styles.css']
          }
        },
        concat: {
            dist: {
                src: ['js/vendor/*.js', 'js/includes/*.js','js/*.js'],
                    dest: '{%= distribution_path %}/{%= js_safe_name %}/_/js/{%= js_safe_name %}.js'
            }
        },
        jshint: {
            afterconcat: ['{%= distribution_path %}/{%= js_safe_name %}/_/js/{%= js_safe_name %}.js']
          },
        imagemin: {                          // Task
            dynamic: {                         // Another target
              files: [{
                expand: true,                  // Enable dynamic expansion
                cwd: 'img/',                   // Src matches are relative to this path
                src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                dest: '{%= distribution_path %}/{%= js_safe_name %}/_/img/'                  // Destination path prefix
              }]
            }
          },
          copy: {
              main: {
                files: [

                  // includes files within path and its sub-directories
                  {expand: true, src: ['fonts/**'], dest: '{%= distribution_path %}/{%= js_safe_name %}/_/'},
                  {expand: true, cwd: 'templates/', src: ['**'], dest: '{%= distribution_path %}/{%= js_safe_name %}/'},
                  {expand: true, cwd: 'behaviors/', src: ['**'], dest: '{%= distribution_path %}/{%= js_safe_name %}/'},
                  {expand: true, cwd: 'js/vendor-exclude', src: ['**'], dest: '{%= distribution_path %}/{%= js_safe_name %}/_/js/vendor'},
                  {expand: true, cwd: '{%= distribution_path %}/{%= js_safe_name %}/_/js/', src: ['**'], dest: '{%= distribution_path %}/{%= js_safe_name %}/_/js/pre-min'}

                ]
              }
            },
        clean: {
            options: { "force": true, "no-write": false },
            build: ["../dist/_/js/pre-min"]
        },
        watch: {
            dev: {
                files: ['sass/*.scss','sass/*/*.scss','sass/**/*.scss','sass/**/**/*.scss','js/*/*.js','js/*.js', 'Gruntfile.js'],
                tasks: 'default'
            },
            builder: {
                files: ['sass/**', 'js/**', 'img/**', 'fonts/**', 'templates/**'],
                tasks: 'build'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task(s).
    grunt.registerTask('theme-init', ['compass:dev','concat','csslint', 'jshint', 'copy-files']);
    grunt.registerTask('default', ['compass:dev','concat','csslint', 'jshint']);
    grunt.registerTask('copy-files', ['imagemin','copy','uglify', 'clean']);
    grunt.registerTask('build', ['default', 'copy']);
    grunt.registerTask('dist', ['compass:dist','concat','copy']);
};