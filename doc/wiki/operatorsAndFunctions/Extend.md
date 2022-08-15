
You can extend the library by creating a class derived from "Library" and adding an instance of it via the addLibrary method.

```typescript
import { expressions,Library } from 'js-expressions'

class TestEnumLib extends Library {
	constructor () {
		super('testEnum')
		this.initEnums()
	}	
	private initEnums (): any {
		this.addEnum('ColorConversion', { BGR2GRAY: 6, BGR2HSV: 40, BGR2RGB: 4, GRAY2BGR: 8, HSV2BGR: 54, HSV2RGB: 55, RGB2GRAY: 7, RGB2HSV: 41 })
		this.addEnum('Color', { RED: 1, GREEN: 2, BLUE: 3 })
	}
}
expressions.config.addLibrary(new TestEnumLib())

console.log(expressions.eval('ColorConversion.GRAY2BGR'))
console.log(expressions.eval('Color.GREEN')))
```
