module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jsdoc : {
        dist : {
            src: ['src/arrow.js','src/KineticMass.js','src/mover.js','src/spring.js','src/axes.js','src/background-motion.js', 'src/wheel.js', 'src/fbd.js','src/physgraphs.js']
			// ,
            // options: {
                // destination: 'doc',
				// template: 'node_modules/minami'
            // } 
			// have discovered minami is uglier than the default, find different theme and uncomment later
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
        src:['src/arrow.js','src/KineticMass.js','src/mover.js','src/spring.js','src/axes.js','src/background-motion.js','src/wheel.js','src/fbd.js','src/physgraphs.js'],
        dest: 'lib/science.js',
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.registerTask('default', ['concat','jsdoc']);

};
