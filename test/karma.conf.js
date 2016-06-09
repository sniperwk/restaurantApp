// karma config

module.exports = function(config) {
	config.set({
		// base path that will be used to resolve all patterns (e.g. files, exclude)
		basePath: '../',

		// frameworks to use
		frameworks: ['jasmine'],

		// list of files/ patterns to load in browser
		files: [
			'bower_components/angular/angular.js',
			'bower_components/angular-resource/angular-resource.js',
			'bower_components/angular-ui-router/release/angular-ui-router.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'app/scripts/*.js',
			'test/unit/**/*.js'
			
			],

		// list of files to exclude
		exclude: [
			'test/protractor.conf.js', 'test/e2e/*.js'
		],

		// preprocess matching files before serving them to the browser
		preprocessors: {

		},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		reporters: ['progress'],

		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		logLevel: config.LOG_INFO,

		// enable /disable watching files and execution
		autoWatch: true,

		// start these browsers
		browsers: ['Chrome', 'PhantomJS', 'PhantomJS_custom'],

		// define custom flags
		customLaunchers: {
			'PhantomJS_custom': {
				base: 'PhantomJS',
				options: {
					windowName: 'my-window',
					settings: {
						webSecurityEnabled: false
					}
				},
				flags: ['--load-images=true'],
				debug: true
			}
		},

		phantomjsLauncher: {
			// have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
			exitOnResourceError: true
		},

		// continous integration mode
		// if true, karma captures browsers, runs the tests and exits
		singleRun: false,

		// concurrency level
		// how many browsers should be started simultaneously
		concurrency: Infinity

	});
};