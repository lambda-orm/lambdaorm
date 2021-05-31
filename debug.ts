import ConfigExtends from 'config-extends';
import orm from './src/orm'

(async () => { 

let schemes =  await ConfigExtends.apply('./test/config/scheme');
for(const p in schemes){
    let scheme =  schemes[p];
    orm.addScheme(scheme);
}

let expression =
`
Order.filter(p=> p.id = id )                     
     .map(p=> p )
     .include(OrderDetail.map(p=> p))
`;

let node = orm.parse(expression);
console.log(orm.serialize(node));

let sentence = orm.sentence(expression,'northwind','sql','oracle');
console.log(sentence);

})();
