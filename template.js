/**
 * grunt-wp-theme
 * https://github.com/10up/grunt-wp-theme
 *
 * Copyright (c) 2013 Eric Mann, 10up
 * Licensed under the MIT License
 */

'use strict';

// Basic template description
exports.description = 'Create a WordPress theme.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '';

// Template-specific notes to be displayed after the question prompts.
exports.after = '';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template
exports.template = function( grunt, init, done ) {
	init.process( {}, [
		// Prompt for these values.
		init.prompt( 'title', 'WP Theme' ),
		{
			name   : 'prefix',
			message: 'PHP function prefix (alpha and underscore characters only)',
			default: 'wptheme'
		},
		init.prompt( 'description', 'The best WordPress theme ever made!' ),
		init.prompt( 'homepage', 'http://wordpress.org/themes' ),
		init.prompt( 'author_name' ),
		init.prompt( 'author_email' ),
		init.prompt( 'author_url' ),
        {
            name   : 'distribution_path',
            message: 'Distribution Path',
            default: 'wptheme'
        }
	], function( err, props ) {
		props.keywords = [];
		props.version = '0.1.0';
		props.devDependencies = {
	    "grunt": "~0.4.1",
	    "grunt-contrib-compass": "~0.6.0",
	    "grunt-contrib-uglify": "~0.2.5",
	    "grunt-contrib-concat": "~0.3.0",
	    "grunt-contrib-watch": "~0.5.3",
	    "grunt-contrib-imagemin": "~0.5.0",
	    "grunt-contrib-copy": "~0.5.0",
	    "grunt-contrib-csslint": "~0.2.0",
	    "grunt-contrib-jshint": "~0.8.0",
	    "grunt-contrib-clean": "~0.5.0"
	  }
		
		// Sanitize names where we need to for PHP/JS
		props.name = props.title.replace( /\s+/g, '-' ).toLowerCase();
		// Development prefix (i.e. to prefix PHP function names, variables)
		props.prefix = props.prefix.replace('/[^a-z_]/i', '').toLowerCase();
		// Development prefix in all caps (e.g. for constants)
		props.prefix_caps = props.prefix.toUpperCase();
		// An additional value, safe to use as a JavaScript identifier.
		props.js_safe_name = props.name.replace(/[\W_]+/g, '_').replace(/^(\d)/, '_$1');
		// An additional value that won't conflict with NodeUnit unit tests.
		props.js_test_safe_name = props.js_safe_name === 'test' ? 'myTest' : props.js_safe_name;
		props.js_safe_name_caps = props.js_safe_name.toUpperCase();

		// Files to copy and process
		var files = init.filesToCopy( props );

		
		console.log( files );
		
		// Actually copy and process files
		init.copyAndProcess( files, props );
		
		// Generate package.json file
		init.writePackageJSON( 'package.json', props );
		
		// Done!
		done();
	});
};