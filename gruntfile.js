var pkgjson = require('./package.json');
 
var config = {
  pkg: pkgjson,
  app: 'app'
}
 
module.exports = function (grunt) {
 
  // Configuration
  grunt.initConfig({
    config: config,
    pkg: config.pkg,
    jade: {
		  debug: {
  		  options: {
  	      data: {
  	        debug: true
  	      }
  	    },
  	    files: {
  	      "views/index.html": "views/index.jade"
  	    }
      }
    }
    // concat: {
    //   options: {
    //     separator: ';'
    //   },
    //   dist: {
    //     src: ['app/app.js', 'app/components/**/*.js'],
    //     dest: 'dist/<%=pkg.name %>.js'
    //   }
    // },
    // uglify: {
    //   options: {
    //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
    //   },
    //   dist: {
    //     files: {
    //       'dist/<%=pkg.name %>.min.js': ['<%= concat.dist.dest %>']
    //     }
    //   }
    // }
  });
 
  grunt.loadNpmTasks('grunt-contrib-jade');
  // grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
   
  grunt.registerTask('default', [
    'jade'
  ]);
};