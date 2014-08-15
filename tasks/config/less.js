/**
 * Compiles LESS files into CSS.
 *
 * ---------------------------------------------------------------
 *
 * Only the `assets/styles/importer.less` is compiled.
 * This allows you to control the ordering yourself, i.e. import your
 * dependencies, mixins, variables, resets, etc. before other stylesheets)
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-less
 */
module.exports = function(grunt) {

	grunt.config.set('less', {
		dev: {
			files: [{
				expand: true,
				cwd: 'assets/styles/',
				src: ['importer.less'],
				dest: '.tmp/public/styles/',
				ext: '.css'
			}]
		},
    admin : {
      files: [{
        expand: true,
        cwd: 'assets/twenty/less/',
        src: ['AdminLTE.less'],
        dest: 'assets/twenty/css/',
        ext: '.css'
      }]
    },
    duoshuo : {
      files: [{
        expand: true,
        cwd: 'assets/twenty/css/duoshuo-embed.css/',
        src: ['duoshuo.less'],
        dest: 'assets/twenty/css/',
        ext: '.css'
      }]
    }
	});

	grunt.loadNpmTasks('grunt-contrib-less');
};
