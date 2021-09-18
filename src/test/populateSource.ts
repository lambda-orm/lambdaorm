const fs = require('fs')
const path = require('path')
const mysql = require('mysql2/promise')
require('dotenv').config({ path: 'src/test/test.env' })

const start = async () => {

	const sourceFile = 'src/test/db/northwind-mysql.sql'
	const script = fs.readFileSync(sourceFile, { encoding: 'utf8' })
	const lines = script.split(';')
	let sentences: string[] = []
	let results: string[] = []
	for (let i = 0; i < lines.length; i++) {
		sentences.push(lines[i].replace(/(?:\r\n|\r|\n)/g, ' ').trim())
	}
	const connection = JSON.parse(process.env.ORM_CNN_SOURCE as string)
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
start()