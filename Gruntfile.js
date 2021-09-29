const fs = require('fs')
require('dotenv').config({ path: './src/test/test.env' })

const databases = ['mysql', 'postgres']
const configPath = './lambdaorm.yaml'

module.exports = function (grunt) {
	// Load the plugins
	// grunt.loadNpmTasks('grunt-contrib-uglify')
	// grunt.loadNpmTasks('grunt-exec')
	require('load-grunt-tasks')(grunt)
	// Project configuration.
	grunt.initConfig({
		exec: {
			create_dbs: { cmd: './create_dbs.sh', options: { cwd: './src/test/db' } },
			drop_dbs: { cmd: './drop_dbs.sh', options: { cwd: './src/test/db' } },
			clean_data: { cmd: './clean_data.sh ' + databases.join(','), options: { cwd: './src/test/task' } },
			clean_test: { cmd: './clean_test.sh ', options: { cwd: './src/test/task' } }
		}
	})

	grunt.registerTask('create-dbs', ['exec:create_dbs'])
	grunt.registerTask('drop-dbs', ['exec:drop_dbs'])
	grunt.registerTask('clean-data', ['exec:clean_data'])
	grunt.registerTask('clean-test', ['exec:clean_test'])

	grunt.registerTask('populate-source', 'populate source db', function () {
		const task = require('./build/dev/task/mysqlExecute')
		const sourceFile = './src/test/db/northwind-mysql.sql'
		const connection = JSON.parse(process.env.ORM_CNN_SOURCE)
		const script = fs.readFileSync(sourceFile, { encoding: 'utf8' })
		task.apply(script, connection, this.async())
	})

	grunt.registerTask('populate-databases', 'populate databases for test', function () {
		const task = require('./build/dev/task/populateDatabases')
		task.apply(configPath, databases, this.async())
	})

	grunt.registerTask('generate-data-for-test', 'generate data for test', function () {
		const task = require('./build/dev/task/generateDataForTest')
		task.apply(configPath, databases, this.async())
	})

	grunt.registerTask('build-config', 'build configuration', function () {
		// this task needs to be js since it must be executed before executing npx tsc
		const task = require('./src/dev/task/buildConfig')
		task.apply(this.async())
	})

	grunt.registerTask('generate-test', 'generate test', function () {
		const task = require('./build/dev/task/generateTest')
		const dataForTestPath = './src/test/dataForTest'
		task.apply(dataForTestPath, databases, this.async())
	})

	grunt.registerTask('databases-down', ['drop-dbs', 'clean-data'])
	grunt.registerTask('databases-up', ['databases-down', 'create-dbs', 'populate-source', 'populate-databases'])
	grunt.registerTask('build-test', ['databases-up', 'clean-test', 'generate-data-for-test', 'generate-test', 'databases-down'])

	grunt.registerTask('default', [])
}
