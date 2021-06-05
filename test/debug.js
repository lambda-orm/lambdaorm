const ConfigExtends = require("config-extends");
const orm = require("../dist/orm.js");

(async () => { 

let schemes =  await ConfigExtends.apply('test/config/scheme');
for(const p in schemes){
    let scheme =  schemes[p];
    orm.addScheme(scheme);
}

let expression =
`
Order.filter(p=> p.id == id ) 
     .includes(details.map(p=>p).includes(product) ,customer.filter(p=>p.name != "pedro"))
`;

let sentence = orm.sentence(expression,'northwind','sql','mysql');
console.log(sentence);

})();
