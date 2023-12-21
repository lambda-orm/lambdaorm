import { ActionObserver, ActionObserverArgs } from '../../domain'
import { ListenerConfig } from 'lambdaorm-base'
import { Expressions } from '3xpr'

export class ExecutionActionObserver extends ActionObserver {
	constructor (private readonly config:ListenerConfig, private readonly expressions:Expressions) {
		super(config.on, config.condition)
	}

	public override async before (args: ActionObserverArgs): Promise<void> {
		if (this.config.before !== undefined) {
			await this.expressions.evalAsync(this.config.before, args)
		}
	}

	public override async after (args: ActionObserverArgs): Promise<void> {
		if (this.config.after !== undefined) {
			await this.expressions.evalAsync(this.config.after, args)
		}
	}

	public override async error (args: ActionObserverArgs): Promise<void> {
		if (this.config.error !== undefined) {
			await this.expressions.evalAsync(this.config.error, args)
		}
	}
}
