/* eslint-disable linebreak-style */
const fs = require('fs')
// const path = require('path')
require('dotenv').config({ path: './src/test/test.env' })

const databases = ['mysql', 'postgres']

module.exports = function (grunt) {
	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-uglify')
	grunt.loadNpmTasks('grunt-exec')
	// Project configuration.
	grunt.initConfig({
		exec: {
			create_dbs: { cmd: './create_dbs.sh', options: { cwd: './src/test/db' } },
			drop_dbs: { cmd: './drop_dbs.sh', options: { cwd: './src/test/db' } },
			clean_data: { cmd: './clean_data.sh ' + databases.join(','), options: { cwd: './src/test/task' } }
		}
	})

	grunt.registerTask('create_dbs', ['exec:create_dbs'])
	grunt.registerTask('drop_dbs', ['exec:drop_dbs'])
	grunt.registerTask('clean_data', ['exec:clean_data'])

	grunt.registerTask('populate_source', 'populate source db', function () {
		const task = require('./dist/test/task/mysqlExecute')
		const sourceFile = './src/test/db/northwind-mysql.sql'
		const connection = JSON.parse(process.env.ORM_CNN_SOURCE)
		const script = fs.readFileSync(sourceFile, { encoding: 'utf8' })
		const done = this.async()
		task.apply(script, connection, done)
	})

	grunt.registerTask('populate_databases', 'populate databases for test', function () {
		const task = require('./dist/test/task/populateDatabases')
		const configPath = './src/test/config.yaml'
		const done = this.async()
		task.apply(configPath, databases, done)
	})

	grunt.registerTask('generate_data_for_test', 'generate data for test', function () {
		const task = require('./dist/test/task/generateDataForTest')
		const configPath = './src/test/config.yaml'
		const done = this.async()
		task.apply(configPath, databases, done)
	})

	grunt.registerTask('generate_test', 'generate test', function () {
		const task = require('./dist/test/task/generateTest')
		const dataForTestPath = './src/test/dataForTest'
		const done = this.async()
		task.apply(dataForTestPath, databases, done)
	})

	// Default task(s).
	// grunt.registerTask('default', ['populate_source'])
	grunt.registerTask('build_test', ['drop_dbs', 'clean_data', 'create_dbs', 'populate_source', 'populate_databases', 'generate_data_for_test', 'generate_test'])
	grunt.registerTask('default', [])
}
