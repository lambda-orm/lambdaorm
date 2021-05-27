const ConfigExtends = require("config-extends");
(async () => { 

const {exp} = await require("./exp.js");

let schemes =  await ConfigExtends.apply('lib/config/scheme');
for(const p in schemes){
    let scheme =  schemes[p];
    exp.addScheme(scheme);
}



let expression = "User.filter(p=> p.sex=='Male' && p.role.name==role)"+
                 "    .sort(p=> [p.lastname,p.name]) "+
                 "    .map(p=> {name: p.firstname+p.lastname,country:p.address.state.country.name,email:p.email})";

// node = exp.parse("User.filter(p=> p.sex=='Male')"+
//                 "     .sort(p=> [p.lastname,p.name]) "+
//                 "     .map(p=> {name: p.firstname+p.lastname,email:p.email})");
// // console.log(exp.serialize(node))
// operand = exp.compile(node);
// console.log(exp.serialize(operand))

let node = exp.parse(expression);
// console.log(exp.serialize(node));

let operand = exp.compile(node,'orm');
console.log(exp.serialize(operand)); 

// let cnx = { language:'orm',variant:'oracle',scheme:'northwind',connection:'' }
// let context = {role:'admin'};
// let result = exp.run(cnx,expression,context);

})();
