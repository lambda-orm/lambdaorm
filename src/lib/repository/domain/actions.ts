import { MetadataParameter, MetadataModel, MetadataConstraint, Metadata, QueryPlan, QueryActions } from 'lambdaorm-base'
import { IOrm } from '../../orm/application'
export class QueryActionsImpl implements QueryActions {
	private orm:IOrm
	private name:string
	private stage?:string
	constructor (name: string, orm:IOrm, stage?:string) {
		this.name = name
		this.stage = stage
		this.orm = orm
	}

	public async execute (query: string, data:any): Promise<any> {
		return this.orm.execute(`${this.name}${query}`, data, { stage: this.stage })
	}

	public normalize (query: string): string {
		return this.orm.normalize(`${this.name}${query}`)
	}

	public async model (query: string): Promise<MetadataModel[]> {
		return this.orm.model(`${this.name}${query}`)
	}

	public async parameters (query: string): Promise<MetadataParameter[]> {
		return this.orm.parameters(`${this.name}${query}`)
	}

	public async constraints (query: string): Promise<MetadataConstraint> {
		return this.orm.constraints(`${this.name}${query}`)
	}

	public async metadata (query: string): Promise<Metadata> {
		return this.orm.metadata(`${this.name}${query}`)
	}

	public async plan (query: string): Promise<QueryPlan> {
		return this.orm.plan(`${this.name}${query}`, { stage: this.stage })
	}
}
