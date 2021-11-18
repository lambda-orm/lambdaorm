
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
	 * @param schema Schema name
	 * @returns Expression complete
	 */
	public complete (datastore?: string):string {
		return this.expressionManager.complete(this.expression, datastore)
	}

	/**
	 * Get model of expression
	 * @param schema Schema name
	 * @returns Model of expression
	 */
	public async model (datastore?: string):Promise<any> {
		return this.expressionManager.model(this.expression, datastore)
	}

	/**
	 * Get parameters of expression
	 * @param schema  Schema name
	 * @returns Parameters of expression
	 */
	public async parameters (datastore?: string):Promise<any> {
		return this.expressionManager.parameters(this.expression, datastore)
	}

	public async sentence (datastore?: string):Promise<string> {
		return this.expressionManager.sentence(this.expression, datastore)
	}

	/**
	 * Get metadata of expression
	 * @param schema Schema name
	 * @returns metadata of expression
	 */
	public async metadata (datastore?: string):Promise<any> {
		return this.expressionManager.metadata(this.expression, datastore)
	}

	/**
	 * Evaluate and solve expression
	 * @param expression  string expression
	 * @param data Data with variables
	 * @param schema Schema name
	 * @returns Result of the evaluale expression
	 */
	public async eval (data: any, datastore?: string): Promise<any> {
		return await this.expressionManager.eval(this.expression, data, datastore)
	}

	/**
	 * Execute expression
	 * @param data Data with variables
	 * @param datastore Database name
	 * @returns Result of execution
	 */
	public async execute (data: any = {}, datastore?: string) {
		const query = await this.expressionManager.toQuery(this.expression, datastore)
		const db = this.configManager.datastore.get(datastore)
		return await this.executor.execute(db, query, data)
	}
}
