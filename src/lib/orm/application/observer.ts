import { ActionObserver, ActionObserverArgs } from '../domain'
import { ListenerConfig } from '../../schema/domain'
import { Expressions } from '3xpr'

export class ExpressionActionObserver extends ActionObserver {
	constructor (private readonly config:ListenerConfig, private readonly expressions:Expressions) {
		super(config.actions, config.condition, config.transactional)
	}

	public override async before (args: ActionObserverArgs): Promise<void> {
		if (this.config.before !== undefined) {
			// TODO: solve async expression
			this.expressions.eval(this.config.before, args)
		}
	}

	public override async after (args: ActionObserverArgs): Promise<void> {
		if (this.config.after !== undefined) {
			// TODO: solve async expression
			this.expressions.eval(this.config.after, args)
		}
	}

	public override async error (args: ActionObserverArgs): Promise<void> {
		if (this.config.error !== undefined) {
			// TODO: solve async expression
			this.expressions.eval(this.config.error, args)
		}
	}
}
