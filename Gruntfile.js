const fs = require('fs')
require('dotenv').config({ path: './test.env' })

const dataSources = ['MySQL', 'PostgreSQL']

module.exports = function (grunt) {
	// Load the plugins
	// grunt.loadNpmTasks('grunt-contrib-uglify')
	// grunt.loadNpmTasks('grunt-exec')
	require('load-grunt-tasks')(grunt)
	// Project configuration.
	grunt.initConfig({
		exec: {
			create_dbs: { cmd: './create_dbs.sh', options: { cwd: './src/dev/db' } },
			drop_dbs: { cmd: './drop_dbs.sh', options: { cwd: './src/dev/db' } },
			clean_data: { cmd: './clean_data.sh ' + dataSources.join(','), options: { cwd: './src/dev/task' } },
			clean_test: { cmd: './clean_test.sh ', options: { cwd: './src/dev/task' } },
			lint: { cmd: 'npx eslint src ' },
			unit_test: { cmd: 'npx jest --config jest-unit-config.json ' },
			integration_test: { cmd: 'npx jest --config jest-integration-config.json ' },
			tsc: { cmd: 'npx tsc ' },
			typedoc: { cmd: 'npx typedoc ' }
		},
		clean: {
			build: ['build'],
			dist: ['dist']
		},
		copy: {
			lib: { expand: true, cwd: 'build/lib', src: '**', dest: 'dist/' },
			sintaxis: { expand: true, cwd: './src', src: './__sintaxis.d.ts', dest: 'build/lib/' },
			readme: { expand: true, src: './README.md', dest: 'dist/' },
			license: { expand: true, src: './LICENSE', dest: 'dist/' },
			images: { expand: true, cwd: 'images/', src: '**', dest: 'dist/images/' }
		}
	})

	grunt.registerTask('create-package', 'create package.json for dist', function () {
		const data = require('./package.json')
		delete data.devDependencies
		delete data.scripts
		delete data.private
		data.main = 'index.js'
		data.types = 'index.d.ts'
		fs.writeFileSync('dist/package.json', JSON.stringify(data, null, 2), 'utf8')
	})

	grunt.registerTask('populate-source', 'populate source db', function () {
		const task = require('./build/dev/task/mysqlExecute')
		const sourceFile = './src/dev/db/northwind-mysql.sql'
		const connection = JSON.parse(process.env.ORM_CNN_SOURCE)
		const script = fs.readFileSync(sourceFile, { encoding: 'utf8' })
		task.apply(script, connection, this.async())
	})

	grunt.registerTask('populate-databases', 'populate databases for test', function () {
		const task = require('./build/dev/task/populateDatabases')
		task.apply(dataSources, this.async())
	})

	grunt.registerTask('generate-data-for-test', 'generate data for test', function () {
		const task = require('./build/dev/task/generateDataForTest')
		task.apply(dataSources, this.async())
	})

	grunt.registerTask('build-config', 'build configuration', function () {
		// this task needs to be js since it must be executed before executing npx tsc
		const task = require('./src/dev/task/buildConfig')
		task.apply(this.async())
	})

	grunt.registerTask('build-wiki', 'build wiki', function () {
		const task = require('./build/dev/task/buildWiki')
		task.apply(this.async())
	})

	grunt.registerTask('generate-test', 'generate test', function () {
		const task = require('./build/dev/task/generateTest')
		const dataForTestPath = './src/dev/dataForTest'
		task.apply(dataForTestPath, dataSources, this.async())
	})

	grunt.registerTask('clean-test', ['exec:clean_test'])
	grunt.registerTask('databases-down', ['exec:drop_dbs', 'exec:clean_data'])
	grunt.registerTask('databases-up', ['databases-down', 'exec:create_dbs', 'populate-source', 'populate-databases'])
	grunt.registerTask('build-test', ['databases-up', 'exec:clean_test', 'generate-data-for-test', 'generate-test', 'databases-down'])
	grunt.registerTask('build', ['clean:build', 'build-config', 'exec:tsc', 'copy:sintaxis'])
	grunt.registerTask('lint', ['exec:lint'])
	grunt.registerTask('unit-test', ['exec:unit_test'])
	grunt.registerTask('integration-test', ['databases-up', 'exec:integration_test', 'databases-down'])
	grunt.registerTask('dist', ['clean:dist', 'copy:lib', 'copy:images', 'copy:readme', 'copy:license', 'create-package'])
	grunt.registerTask('doc', ['build-wiki', 'exec:typedoc'])

	grunt.registerTask('default', [])
}
