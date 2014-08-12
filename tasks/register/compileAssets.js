module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
		'jst:dev',
    'less:admin',
    'less:dev',
		'copy:dev',
		'coffee:dev'
	]);
};
