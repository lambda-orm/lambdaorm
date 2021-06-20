const ConfigExtends = require("config-extends");
const orm = require("../dist/orm.js");
let variant= 'mysql'; 

before(async () => {  
    let schemas =  await ConfigExtends.apply('test/config/schema');
    for(const p in schemas){
        let schema =  schemas[p];
        orm.applySchema(schema);
    }
    cnx = {name:'northwind',language:'sql',variant:variant,host:'0.0.0.0',port:3306,user:'root',password:'admin',schema:'northwind' ,database:'northwind'};
    orm.addConnection(cnx);
});