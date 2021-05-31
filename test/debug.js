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
Product.filter(p=> p.discontinued != false )                 
        .map(p=> {category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock} )
        .sort(p=> [p.category,desc(p.name)])
`;


let sentence = orm.sentence(expression,'northwind','sql','oracle');
console.log(sentence);

})();
