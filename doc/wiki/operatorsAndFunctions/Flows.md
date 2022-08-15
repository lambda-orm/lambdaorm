|flow controls  |
|---------------|
|if							|
|else						|
|switch					|
|for						|
|for	in				|
|while					|

## Examples

```js
import { expressions as exp } from 'js-expressions'

let context = {
	devices: [
		{ type: 'phone', imei: '911784599437339', mac: '10:3d:1c:9b:7e:db' },
		{ type: 'computer', mac: '11:3d:1c:9b:7e:db' },
		{ type: 'robot', mac: '12:3d:1c:9b:7e:db' }
	]
}

console.log(exp.eval(`
	list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	total = 0;
	for (i = 0; i < list.length(); i += 1) {
		total += list[i];
	}
	total;`,context))
	// 45

console.log(exp.eval(`
	list = [1, 2, 3, 4, 5, 6];
	b = 1;
	for (a in list) {
		if (b < 10) {
			b = a * b;
		}
	}
	b;`,context))
	// 24

console.log(exp.eval(`
	device = devices[0];
	switch(device.type){ 
		case "phone": 
			key = device.imei; 
		case "computer": 
			key = device.mac; 
		default:
			if(isNotNull(device.imei)){
				key = device.imei;
			}else{
				key = device.mac; 
			} 
		}
		id= concat(device.type,"-",key);
	`,context))
	//'phone-911784599437339'

	console.log(exp.eval(`
		devices.map(p=> 
			concat(p.type,"-",
				if(p.type=="phone"){
					p.imei 
				} else {
					p.mac
				}
			)
		)`,context))
	// ['phone-911784599437339','computer-11:3d:1c:9b:7e:db','robot-12:3d:1c:9b:7e:db']

console.log(exp.eval(`
	devices.map(p=> 
		switch(p.type){ 
			case "phone": 1; 
			case "robot": 2 ; 
			default: 3;}
	)`,context))
// [1,3,2])
console.log(exp.eval(`
	while (p=devices.pop()) {
		  mac=p.mac;
	}
	mac;`,context))
	// '10:3d:1c:9b:7e:db'

```
