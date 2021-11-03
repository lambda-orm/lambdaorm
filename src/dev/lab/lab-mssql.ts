const tedious = require('tedious')

async function testmssql ():Promise<void> {
	// const poolConfig = { min: 2, max: 4, log: true }
	// const connectionConfig = { userName: 'sa', password: 'Lambda1234!', server: 'localhost', options: { encrypt: false, database: 'northwind' } }
	// const sql = 'CREATE TABLE Categories (CategoryID INTEGER NOT NULL IDENTITY (1, 1),CategoryName VARCHAR(80) NOT NULL ,Description VARCHAR(1000)  ,PRIMARY KEY (CategoryID),CONSTRAINT Categories_UK UNIQUE (CategoryName))'
	const sql = 'SELECT 1'
	const config = {
		server: 'localhost',
		authentication: {
			type: 'default',
			options: {
				userName: 'sa',
				password: 'Lambda1234!'
			}
		},
		options: {
			port: 1433, // Default Port
			database: 'northwind'
		}
	}

	const connection = new tedious.Connection(config)
	connection.connect()
	connection.on('connect', (err:any) => {
		if (err) {
			console.log('Connection Failed')
			throw err
		}

		const request = new tedious.Request(sql, (err:any, row:any) => {
			if (err) {
				console.log('Insert failed')
				throw err
			}
			console.log(row)
			connection.close()

			console.log('new Request cb')
		})
		connection.execSql(request)
	})
}

testmssql()
