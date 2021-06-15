


//https://docs.ponyorm.org/
//https://github.com/ponyorm/pony/
//https://www.fullstackpython.com/object-relational-mappers-orms.html
//https://www.dabapps.com/blog/django-models-and-encapsulation/

const orm = require("../dist/orm");

// mikri-orm , prisma , typeorm



orm.exec(()=> Order.filter(p=> p.id == id)
                  .include(OrderDetail.filter(p => p.enable == true)
                          .include(Product).map(p=> p.name))
                  .include(Customer.map(p=> p.name))         
        ,{id:1},'northwind');


//en los includes se podran poner los diferentes niveles como un listado
// por ejemplo details.product deberia traer la relacion con details y por cada details la relacion con product
orm.exec(()=> Order.filter(p=>p.id==id).includes(details.product,customer),{id:10582},'northwind');

// En este caso solo debera traer los campos name y unitPrice de la relacion con product
orm.exec(()=> Order.filter(p=>p.id==id).includes(details.product.map(p=> p.name,p.unitPrice),customer),{id:10582},'northwind');  

// En este caso solo debera traer los campos name y unitPrice de la relacion con product,pero unitPrice lo traera como price
orm.exec(Order.filter(p=>p.id==id).includes(details.product.map(p=> p.name,as(p.unitPrice,'price')),customer),{id:10582},'northwind');  
 
