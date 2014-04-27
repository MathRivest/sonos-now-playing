module.exports = function(grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// 1. All configuration goes here
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Empties folders to start fresh
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'dist/*'
					]
				}]
			},
			server: '.tmp'
		},

		// Compiles Sass to CSS and generates necessary files if requested
		compass: {
			options: {
				sassDir: 'static/styles/sass',
				cssDir: 'static/styles/css',
				require: 'susy',
				outputStyle: 'expanded',
				// generatedImagesDir: '.tmp/images/generated',
				imagesDir: 'static/images',
				// javascriptsDir: '/scripts',
				// fontsDir: '/styles/fonts',
				// importPath: '/bower_components',
				httpImagesPath: '/images',
				// httpGeneratedImagesPath: '/images/generated',
				// httpFontsPath: '/styles/fonts',
				// relativeAssets: false,
				// assetCacheBuster: false
			},
			dist: {
				options: {
					generatedImagesDir: 'dist/images/generated',
					outputStyle: 'compressed'
				}
			},
			dev: {
				options: {
					debugInfo: true
				}
			}
		},

		watch: {
			options: {
				livereload: true,
			},
			all: {
				files: ['static/styles/sass/**/*.scss', 'index.html'],
				tasks: ['compass:dev'],
			},

		},

		connect: {
			options: {
				port: 8000,
				livereload: 35729,
				hostname: 'localhost'
			},
			livereload: {
				options: {
					open: true,
					base: ''
				}
			},
		},

		// Generates a custom Modernizr build that includes only the tests you
		// reference in your app
		modernizr: {
			devFile: 'bower_components/modernizr/modernizr.js',
			outputFile: 'dist/js/modernizr-custom.js',
			files: [
				'dist/js/{,*/}*.js',
				'dist/css/{,*/}*.css'
			],
			uglify: true
		}

	});

	// 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
	grunt.registerTask('default');

	grunt.registerTask('serve', [
		'compass:dev',
		'connect:livereload',
		'watch'
	]);

	grunt.registerTask('build', [
		'clean:dist',
		'compass:dist',
		'modernizr',
	]);

};
