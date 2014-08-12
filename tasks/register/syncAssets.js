module.exports = function (grunt) {
	grunt.registerTask('syncAssets', [
		'jst:dev',
		'less:dev',
		'less:admin',
		'sync:dev',
		'coffee:dev'
	]);
};
