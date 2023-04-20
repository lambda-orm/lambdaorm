import { IExpressions } from '3xpr'
import { ActionObserver, ActionObserverArgs, ListenerConfig } from '../../domain/model'

export class ExpressionActionObserver extends ActionObserver {
	constructor (private readonly config:ListenerConfig, private readonly expressions:IExpressions) {
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
