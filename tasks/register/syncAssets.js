module.exports = function (grunt) {
	grunt.registerTask('syncAssets', [
		'jst:dev',
		'less:dev',
		'less:admin',
		'less:duoshuo',
		'sync:dev',
		'coffee:dev'
	]);
};
