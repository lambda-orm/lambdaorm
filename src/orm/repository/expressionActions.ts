export interface IExpressionActions {
	complete (expresion: string):string
	model (expresion: string):Promise<any>
	parameters (expresion: string):Promise<any>
	sentence (expresion: string):Promise<string>
	metadata (expresion: string):Promise<any>
	execute(expresion: string, data?: any): Promise<any>
}
