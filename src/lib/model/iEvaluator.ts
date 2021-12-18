export interface IEvaluator
{
	eval (expression: string, data: any): Promise<any>
}
