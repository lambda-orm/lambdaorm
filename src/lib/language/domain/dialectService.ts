import { DialectFormat } from './'

export interface DialectService {
	name: string
	format: DialectFormat
	get solveComposite (): boolean
	isReservedWord (name: string): boolean
	operator (name: string, operands: number): string
	function (name: string): any
	support (name: string): string
	dml (name: string): string
	other (name: string): string
	ddl (name: string): string
	dbType (name: string): string
	type (name: string): string
	delimiter (name: string, force?:boolean, excludeUnderscore?:boolean): string
	string (name: string): string
	getOperatorMetadata (name: string, operands: number): string | null
	getFunctionMetadata (name: string): string | null
}
