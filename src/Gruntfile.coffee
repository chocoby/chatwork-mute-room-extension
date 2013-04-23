module.exports = (grunt) ->
  pkg = grunt.file.readJSON 'package.json'
  grunt.initConfig
    watch:
      files: ['coffee/**/*.coffee'],
      tasks: ['coffee']

    coffee:
      compile:
        options:
          sourceMap: true
        files: [
            expand: true,
            cwd: 'coffee/',
            src: ['**/*.coffee'],
            dest: 'js/',
            ext: '.js'
        ]

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
