require('dotenv').config({ path: './config/northwind.env' })
const sources = ['MySQL', 'MariaDB', 'PostgreSQL', 'SqlServer', 'MongoDB', 'Oracle']
module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt)
	grunt.initConfig({
		exec: {
			db_up: { cmd: './db.sh up', options: { cwd: './src/dev/northwind/db' } },
			db_down: { cmd: './db.sh down', options: { cwd: './src/dev/northwind/db' } },
			clean_data: { cmd: './clean_data.sh ' + sources.join(','), options: { cwd: './src/dev/task' } },
			clean_test: { cmd: './clean_test.sh ', options: { cwd: './src/dev/task' } },
			lint: { cmd: 'npx eslint src' },
			test: { cmd: 'npx jest --config jest-config.json' },
			integration_test: { cmd: 'npx jest --config jest-integration-config.json' },
			tsc: { cmd: 'npx tsc ' },
			release: { cmd: './task/release.sh' },
			doc: { cmd: 'npx typedoc --plugin typedoc-plugin-markdown --out doc/source src/lib/index.ts' }
		},
		clean: {
			build: ['build'],
			dist: ['dist']
		},
		copy: {
			lib: { expand: true, cwd: 'build/lib', src: '**', dest: 'dist/' },
			readme: { expand: true, src: './README.md', dest: 'dist/' },
			changeLog: { expand: true, src: './CHANGELOG.md', dest: 'dist/' },
			license: { expand: true, src: './LICENSE', dest: 'dist/' },
			images: { expand: true, cwd: 'images/', src: '**', dest: 'dist/images/' },
			jest: { expand: true, src: './jest-config.json', dest: 'dist/' }
		}
	})

	grunt.registerTask('create-package', 'create package.json for dist', function () {
		const fs = require('fs')
		const data = require('../package.json')
		delete data.devDependencies
		delete data.private
		data.scripts = {
			test: data.scripts.test
		}
		data.main = 'index.js'
		data.types = 'index.d.ts'
		fs.writeFileSync('dist/package.json', JSON.stringify(data, null, 2), 'utf8')
	})

	grunt.registerTask('countries-populate-source', 'countries populate source', function () {
		const task = require('../build/dev/countries/task/populateSource')
		task.apply(this.async())
	})
	grunt.registerTask('countries-create-data-for-test-suite', 'countries create data for test suite', function () {
		const task = require('../build/dev/countries/task/createDataForTestSuite')
		task.apply(this.async())
	})
	grunt.registerTask('countries-create-test-suite', 'countries create test suite', function () {
		const task = require('../build/dev/countries/task/createTestSuite')
		task.apply(this.async())
	})

	grunt.registerTask('populate-source', 'populate source db', function () {
		const fs = require('fs')
		const task = require('../build/dev/task/mysqlExecute')
		const sourceFile = './src/dev/northwind/db/northwind-mysql.sql'
		const connection = JSON.parse(process.env.ORM_CNN_SOURCE)
		const script = fs.readFileSync(sourceFile, { encoding: 'utf8' })
		task.apply(script, connection, this.async())
	})

	grunt.registerTask('populate-databases', 'populate databases for test', function () {
		const task = require('../build/dev/northwind/task/populateDatabases')
		task.apply(sources, this.async())
	})

	grunt.registerTask('create-data-for-test', 'create data for test', function () {
		const task = require('../build/dev/northwind/task/createDataForTest')
		task.apply(sources, this.async())
	})

	grunt.registerTask('create-data-for-test-suite', 'create data for test suite', function () {
		const task = require('../build/dev/northwind/task/createDataForTestSuite')
		task.apply(sources, this.async())
	})

	grunt.registerTask('create-test', 'create test', function () {
		const task = require('../build/dev/northwind/task/createTest')
		const dataForTestPath = './src/dev/northwind/test/data'
		task.apply(dataForTestPath, sources, this.async())
	})

	grunt.registerTask('create-test-suite', 'create test suite', function () {
		const task = require('../build/dev/northwind/task/createTestSuite')
		task.apply(this.async())
	})

	grunt.registerTask('build-config', 'build configuration', function () {
		// this task needs to be js since it must be executed before executing npx tsc
		const task = require('../src/dev/task/buildConfig')
		task.apply(this.async())
	})

	grunt.registerTask('build-wiki', 'build wiki', function () {
		const task = require('../build/dev/task/buildWiki')
		task.apply(this.async())
	})

	grunt.registerTask('clean-test', ['exec:clean_test'])
	grunt.registerTask('clean-data', ['exec:clean_data'])
	grunt.registerTask('db-down', ['exec:db_down', 'clean-data'])
	grunt.registerTask('db-up', ['db-down', 'exec:db_up', 'populate-source', 'populate-databases'])
	grunt.registerTask('build-test', ['db-up', 'clean-test', 'create-data-for-test', 'create-data-for-test-suite', 'create-test', 'create-test-suite', 'db-down'])

	grunt.registerTask('lint', ['exec:lint'])
	grunt.registerTask('build', ['lint', 'clean:build', 'build-config', 'exec:tsc'])
	grunt.registerTask('test', ['build', 'exec:test'])
	grunt.registerTask('integration-test', ['db-up', 'exec:integration_test', 'db-down'])
	grunt.registerTask('doc', ['build-wiki', 'exec:doc'])
	grunt.registerTask('dist', ['test', 'clean:dist', 'copy:lib', 'copy:jest', 'copy:images', 'copy:readme', 'copy:changeLog', 'copy:license', 'create-package'])
	grunt.registerTask('release', ['dist', 'doc', 'exec:release'])
	grunt.registerTask('default', [])
}
