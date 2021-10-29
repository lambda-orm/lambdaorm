
import { Executor, ExpressionManager, ConfigManager } from '.'

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
	public complete (database?: string):string {
		return this.expressionManager.complete(this.expression, database)
	}

	/**
	 * Get model of expression
	 * @param schema Schema name
	 * @returns Model of expression
	 */
	public async model (database?: string):Promise<any> {
		return this.expressionManager.model(this.expression, database)
	}

	/**
	 * Get parameters of expression
	 * @param schema  Schema name
	 * @returns Parameters of expression
	 */
	public async parameters (database?: string):Promise<any> {
		return this.expressionManager.parameters(this.expression, database)
	}

	public async sentence (database?: string):Promise<string> {
		return this.expressionManager.sentence(this.expression, database)
	}

	/**
	 * Get metadata of expression
	 * @param schema Schema name
	 * @returns metadata of expression
	 */
	public async metadata (database?: string):Promise<any> {
		return this.expressionManager.metadata(this.expression, database)
	}

	/**
	 * Evaluate and solve expression
	 * @param expression  string expression
	 * @param context Context with variables
	 * @param schema Schema name
	 * @returns Result of the evaluale expression
	 */
	public async eval (context: any, database?: string): Promise<any> {
		return await this.expressionManager.eval(this.expression, context, database)
	}

	/**
	 * Execute expression
	 * @param context Context with variables
	 * @param database Database name
	 * @returns Result of execution
	 */
	public async execute (context: any = {}, database?: string) {
		const query = await this.expressionManager.toQuery(this.expression, database)
		const db = this.configManager.database.get(database)
		return await this.executor.execute(db, query, context)
	}
}
