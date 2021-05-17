const ConfigExtends = require("config-extends");
const Exp = require("./exp.js");

(async () => { 

// let oracle = await ConfigExtends.apply('lib/sql.yaml','lib/oracle.yaml');
// console.log(oracle);
let exp = new Exp();
node = exp.parse("User.select(p=> {name: p.firstname+p.lastname,email:p.email})"+
                "     .where(p=> p.sex=='Male')      "+
                "     .sort(p=> [p.lastname,p.name])");
console.log(exp.serialize(node))

// operand = exp.compile(node);
// console.log(exp.serialize(operand))


})();
