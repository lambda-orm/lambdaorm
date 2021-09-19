/* eslint-disable linebreak-style */
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: './test.env' })


module.exports = function (grunt) {
	// Project configuration.

	grunt.initConfig({
		exec: {
			start_dbs: { cmd: './start.sh', options: { cwd: 'db' } }
			// populate_source: { cmd: 'pwd', env: './src/test/test.env', options: { cwd: '../../' } }
		}
	})

	grunt.registerTask('populate_source', 'populate source db', function () {
		const mysqlExec = require('../../dist/test/task/mysqlExec')
		const sourceFile = '../../src/test/db/northwind-mysql.sql'
		const script = fs.readFileSync(sourceFile, { encoding: 'utf8' })
		const done = this.async();
		mysqlExec.start(script, done)
		console.log('INFO: populate source end')
	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-uglify')
	grunt.loadNpmTasks('grunt-exec')


	// Default task(s).
	//grunt.registerTask('default', ['populate_source'])
	grunt.registerTask('default', ['exec:start_dbs', 'populate_source'])
}
