const ConfigExtends = require("config-extends");
const orm = require("../dist/orm.js");

(async () => { 

let schemes =  await ConfigExtends.apply('test/config/scheme');
for(const p in schemes){
    let scheme =  schemes[p];
    orm.addScheme(scheme);
}

let cnx = {name:'northwind',language:'sql',variant:'mysql',host:'0.0.0.0',port:3306,user:'root',password:'admin',database:'northwind'};
orm.addConnection(cnx);

let expression =
`
Order.filter(p=> p.id == id ) 
     .includes(details.map(p=>p).includes(product) ,customer.filter(p=>p.name != "pedro"))
`;

let operand = orm.compile(expression,'sql','mysql','northwind');
let serialized = orm.serialize(operand,'sql');
console.log(serialized);

let result = orm.run()

})();
