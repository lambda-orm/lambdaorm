
import { Executor, ExpressionManager, ConfigManager } from './'

/**
 * Expression Manager
 */
export class ExpressionFacade {
	private expressionManager: ExpressionManager
	private executor: Executor
	private configManager: ConfigManager
	public expression: string

	constructor (expressionManager:ExpressionManager, executor:Executor, configManager: ConfigManager, expression:string) {
		this.expressionManager = expressionManager
		this.executor = executor
		this.configManager = configManager
		this.expression = expression
	}

	/**
	 * Complete expression
	 * @returns Expression complete
	 */
	public complete ():string {
		return this.expressionManager.complete(this.expression)
	}

	/**
	 * Get model of expression
	 * @returns Model of expression
	 */
	public async model ():Promise<any> {
		return this.expressionManager.model(this.expression)
	}

	/**
	 * Get parameters of expression
	 * @returns Parameters of expression
	 */
	public async parameters ():Promise<any> {
		return this.expressionManager.parameters(this.expression)
	}

	public async sentence (datastore: string):Promise<string> {
		return this.expressionManager.sentence(this.expression, datastore)
	}

	/**
	 * Get metadata of expression
	 * @returns metadata of expression
	 */
	public async metadata ():Promise<any> {
		return this.expressionManager.metadata(this.expression)
	}

	/**
	 * Evaluate and solve expression
	 * @param expression  string expression
	 * @param data Data with variables
	 * @returns Result of the evaluale expression
	 */
	public async eval (data: any): Promise<any> {
		return await this.expressionManager.eval(this.expression, data)
	}

	/**
	 * Execute expression
	 * @param data Data with variables
	 * @param context Context
	 * @param datastore DataStore name
	 * @returns Result of execution
	 */
	public async execute (data: any = {}, context:any, datastore: string):Promise<any> {
		const query = await this.expressionManager.toQuery(this.expression, datastore)
		const db = this.configManager.datastore.get(datastore)
		return await this.executor.execute(db, query, data, context)
	}
}
