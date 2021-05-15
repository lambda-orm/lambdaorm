const ConfigExtends = require("config-extends");
const Exp = require("./exp.js");

(async () => { 

// let oracle = await ConfigExtends.apply('lib/sql.yaml','lib/oracle.yaml');
// console.log(oracle);
let exp = new Exp();
node = exp.parse('1+1');
console.log(exp.serialize(node))

operand = exp.compile(node);

})();
