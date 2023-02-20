import { IExpressions } from '3xpr'
import { ActionObserver, ActionObserverArgs, ListenerInfo } from '../contract'

export class ExpressionActionObserver extends ActionObserver {
	constructor (private readonly info:ListenerInfo, private readonly expressions:IExpressions) {
		super(info.action, info.condition)
	}

	public override async before (args: ActionObserverArgs): Promise<void> {
		if (this.info.before !== undefined) {
			// TODO: solve async expression
			this.expressions.eval(this.info.before, args)
		}
	}

	public override async after (args: ActionObserverArgs): Promise<void> {
		if (this.info.after !== undefined) {
			// TODO: solve async expression
			this.expressions.eval(this.info.after, args)
		}
	}

	public override async error (args: ActionObserverArgs): Promise<void> {
		if (this.info.error !== undefined) {
			// TODO: solve async expression
			this.expressions.eval(this.info.error, args)
		}
	}
}
