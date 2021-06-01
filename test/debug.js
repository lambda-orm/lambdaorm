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
Order.filter(p=> p.id = id )                     
     .map(p=> p )
     .includes(details.map(p=> p),customer.map(p=> p))
`;

let node = orm.parse(expression);
// console.log(orm.serialize(node));

let sentence = orm.sentence(expression,'northwind','sql','oracle');
console.log(sentence);

})();
