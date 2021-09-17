/* eslint-disable linebreak-style */

module.exports = function (grunt) {
	// Project configuration.

	grunt.initConfig({
		mysql_query: {
			createDbSource: {
				host: '0.0.0.0',
				user: 'root',
				pass: 'root',
				database: '',
				queries: [{ file: 'src/test/db/northwind-mysql.sql' }]
			}
		}
	})

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-uglify')
	grunt.loadNpmTasks('grunt-mysql-query')

	// Default task(s).
	grunt.registerTask('default', ['mysql_query:createDbSource'])
}
