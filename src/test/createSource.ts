const fs = require('fs')
const path = require('path')
const mysql = require('mysql2/promise') 

async function createDatabase() {
	const connection = { host: "0.0.0.0", port: 3306, user: "root", password: "root",multipleStatements: true }
	const cnx = await mysql.createConnection(connection)
	await cnx.connect()
	cnx.execute('CREATE DATABASE IF NOT EXISTS northwind')
	await cnx.close()
}

async function createModelAndData() {
	const sourceFile = 'src/test/db/northwind-mysql.sql'
	const script = fs.readFileSync(sourceFile, { encoding: 'utf8' })
	const lines = script.split(';')
	let sentences: string[] = []
	let results: string[] = []
	for (let i = 0; i < lines.length; i++) {
		sentences.push(lines[i].replace(/(?:\r\n|\r|\n)/g, ' ').trim())
	}
	const connection = { host: "0.0.0.0", port: 3306, user: "root", password: "root",multipleStatements: true,database:"northwind" }
	const cnx = await mysql.createConnection(connection)
	await cnx.connect()
	for (let i = 0; i < sentences.length; i++) {
		const sentence = sentences[i]
		if (sentence.startsWith('#')) continue
		try {
			const result = await cnx.execute(sentence)
			results.push(result)
		} catch (error) {
			console.log(`sentence ${sentence} error: ${error}`)
		}
	}
	await cnx.close()
}

const start = async () => {
	
	await createDatabase()
	await createModelAndData()
}
start()