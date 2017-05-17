module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jsdoc : {
        dist : {
            src: ['src/arrow.js','src/KineticMass.js','src/mover.js','src/spring.js','src/axes.js','src/background-motion.js', 'src/wheel.js', 'src/fbd.js','src/physgraphs.js', 'src/particle.js', 'src/wave.js']
			,
            options: {
                destination: 'doc',
				template: 'science-sims-template'
            } 
        }
    },
	"jsbeautifier" : {
    "default": {
        src : ["src/**/*.js"]
    }
},

    concat: {
      options: {
        // separator: ';',
        stripBanners: false,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */ \n',
      },
      dist: {
        src:['src/arrow.js','src/KineticMass.js','src/mover.js','src/spring.js','src/axes.js','src/background-motion.js','src/wheel.js','src/fbd.js','src/physgraphs.js',  'src/particle.js','src/wave.js'],
        dest: 'lib/science.js',
      } //,
	     // dist: {
        // src:['src/science.css'],
        // dest: 'lib/science.css',
      // }, just adding this in makes it only compile the css rather than the js, need to figure out how to run multiple concats
    },
	 uglify: {
    options: {
      mangle: false
    },
  my_target: {
      files: {
        'lib/science.min.js': ['lib/science.js'],
        'lib/science.min.css': ['lib/science.min.css']
      }
    }
  }
  } 
	
  );
  grunt.loadNpmTasks("grunt-jsbeautifier");
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.registerTask('default', ['jsbeautifier', 'concat','jsdoc',  'uglify']);

};
