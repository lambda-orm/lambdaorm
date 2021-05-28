const ConfigExtends = require("config-extends");
(async () => { 

const {exp} = await require("./exp.js");

let schemes =  await ConfigExtends.apply('lib/config/scheme');
for(const p in schemes){
    let scheme =  schemes[p];
    exp.addScheme(scheme);
}



// let expression = "User.filter(p=> p.sex=='Male' && year(p.brithdate)>=18 )"+                 
//                  "    .map(p=> {name: concat(p.firstname,' ',p.lastname),country:p.address.state.country.name,email:p.email,rolesCount:count(p.roles) })"+
//                  "    .sort(p=> [desc(p.rolesCount),p.name]) "+
//                  "";

let expression = "Product.filter(p=> p.discontinued != false )"+                 
"                        .map(p=> {category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock} )"+
"                        .sort(p=> [p.category,p.name]) "+
"";

let node = exp.parse(expression);
console.log(exp.serialize(node));

let operand = exp.compile(node,'orm');
// console.log(exp.serialize(operand)); 

let cnx = { language:'orm',variant:'oracle',scheme:'northwind',connection:'' }
let context = {role:'admin'};
let result = exp.run(cnx,operand,context);
console.log(result); 

})();
