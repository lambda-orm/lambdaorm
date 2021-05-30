const ConfigExtends = require("config-extends");
(async () => { 

const exp = await require("../lib/exp.js");

let schemes =  await ConfigExtends.apply('test/config/scheme');
for(const p in schemes){
    let scheme =  schemes[p];
    exp.addScheme(scheme);
}

let expression =
`
Product.filter(p=> p.discontinued != false )                 
        .map(p=> {category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock} )
        .sort(p=> [p.category,desc(p.name)])
`;


let sentence = exp.sentence(expression,'northwind','sql','oracle');
console.log(sentence);

})();
