export enum Dialect {
  MySQL = 'MySQL',
  MariaDB = 'MariaDB',
  PostgreSQL = 'PostgreSQL',
  SqlServer = 'SqlServer',
	SQLjs = 'SQLjs',
	Oracle = 'Oracle',
	MongoDB = 'MongoDB',
}
export interface DialectFormat {
	dateTime: string
	date: string
	time: string
}
