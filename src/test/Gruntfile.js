/* eslint-disable linebreak-style */

module.exports = function (grunt) {
	// Project configuration.

	grunt.initConfig({
		exec: {
			start_dbs: { cmd: 'start.sh', cwd: 'db' }
		}
	})

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-uglify')
	grunt.loadNpmTasks('grunt-exec')


	// Default task(s).
	grunt.registerTask('default', ['exec:start_dbs'])
}
