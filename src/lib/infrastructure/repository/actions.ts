import { QueryInfo, MetadataParameter, MetadataModel, MetadataConstraint, Metadata } from '../../domain'
import { IOrm } from '../../application'
export class ExpressionActions {
	private orm:IOrm
	private name:string
	private stage?:string
	constructor (name: string, orm:IOrm, stage?:string) {
		this.name = name
		this.stage = stage
		this.orm = orm
	}

	public async execute (expression: string, data:any): Promise<any> {
		return this.orm.execute(`${this.name}${expression}`, data, { stage: this.stage })
	}

	public normalize (expression: string): string {
		return this.orm.normalize(`${this.name}${expression}`)
	}

	public async model (expression: string): Promise<MetadataModel[]> {
		return this.orm.model(`${this.name}${expression}`)
	}

	public async parameters (expression: string): Promise<MetadataParameter[]> {
		return this.orm.parameters(`${this.name}${expression}`)
	}

	public async constraints (expression: string): Promise<MetadataConstraint> {
		return this.orm.constraints(`${this.name}${expression}`)
	}

	public async metadata (expression: string): Promise<Metadata> {
		return this.orm.metadata(`${this.name}${expression}`)
	}

	public async getInfo (expression: string): Promise<QueryInfo> {
		return this.orm.getInfo(`${this.name}${expression}`, { stage: this.stage })
	}
}
