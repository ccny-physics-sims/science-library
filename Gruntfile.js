module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jsdoc : {
        dist : {
            src: ['src/arrow.js','src/KineticMass.js','src/mover.js','src/spring.js','src/axes.js','src/background-motion.js', 'src/wheel.js', 'src/fbd.js','src/physgraphs.js', 'src/particle.js', 'src/wave.js', 'src/background-static.js', 'README.md']
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
        src:['src/arrow.js','src/KineticMass.js','src/mover.js','src/spring.js','src/axes.js','src/background-motion.js','src/wheel.js','src/fbd.js','src/physgraphs.js',  'src/particle.js','src/wave.js', 'src/background-static.js'],
        dest: 'lib/science.js',
      } 
    },
	 uglify: {
    options: {
      mangle: true
    },
		compress: {
		sequences: true,
		dead_code: true,
		conditionals: true,
		booleans: true,
		unused: true,
		if_return: true,
		join_vars: true,
		drop_console: true
	},
  my_target: {
      files: {
        'lib/science.min.js': ['lib/science.js']
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
