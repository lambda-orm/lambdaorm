import '../orm/sintaxis'
import { orm } from '../orm'
const path = require('path')

async function toExpression () {
  const expressions = [
    'Products.map(p=>p)',
    'Products',
    'Products.page(1,1)',
    'Products.first()',
    'Products.first(p=> p)',
    'Products.last()',
    'Products.last(p=> p)',
    'Products.take()',
    'Products.take(p=> p)',
    'Products.distinct()',
    'Products.distinct(p=> p)',
    'Products.filter(p=>p.id==id).map(p=>p)',
    'Products.filter(p=>p.id==id)',
    'Products.map(p=> p.category.name)',
    'Products.map(p=>({category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock}))',
    'Products.filter(p=> p.discontinued != false ).map(p=> ({category:p.category.name,name:p.name,quantity:p.quantity,inStock:p.inStock})).sort(p=> [p.category,desc(p.name)])',
    'OrderDetails.filter(p=> between(p.order.shippedDate,from,to) && p.unitPrice > minValue ).map(p=> ({category: p.product.category.name,product:p.product.name,unitPrice:p.unitPrice,quantity:p.quantity})).sort(p=> [p.category,p.product])',
    'OrderDetails.map(p=> ({order: p.orderId,subTotal:sum((p.unitPrice*p.quantity*(1-p.discount/100))*100) }))',
    'Products.map(p=> {category:p.category.name,largestPrice:max(p.price)})',
    'Products.filter(p=>p.id == id ).map(p=> {name:p.name,source:p.price ,result:abs(p.price)} )',
    'Orders.filter(p=>p.id==id).include(p => p.customer)',
    'Orders.filter(p=>p.id==id).include(p => p.details)',
    'Orders.filter(p=>p.id==id).include(p => [p.details,p.customer])',
    'Orders.filter(p=>p.id==id).include(p => [p.details.include(q=>q.product),p.customer])',
    'Orders.filter(p=>p.id==id).include(p => [p.details.include(q=>q.product.include(p=>p.category)),p.customer])',
    'Orders.filter(p=>p.id==id).include(p => [p.details.map(p=>({quantity:p.quantity,unitPrice:p.unitPrice,productId:p.productId})) ,p.customer])',
    'Orders.filter(p=>p.id==id).include(p => [p.details.include(q=>q.product).map(p=>({quantity:p.quantity,unitPrice:p.unitPrice,productId:p.productId})),p.customer])',
    'Orders.filter(p=> p.id == id).include(p => p.details)',
    'Orders.insert().include(p => p.details)',
    'Orders.insert(entity).include(p=> [p.details,p.customer])',
    'Orders.update().include(p => p.details)',
    'Orders.update({name:entity.name}).include(p=> p.details.update(p=> ({unitPrice:p.unitPrice,productId:p.productId }))).filter(p=> p.id == entity.id )',
    'Orders.update().include(p=> [p.details,p.customer])',
    'Orders.update({name:entity.name}).filter(p=> p.id == entity.id)',
    'Orders.update({name:entity.name})',
    'Orders.updateAll({name:entity.name})',
    'Orders.delete()',
    'Orders.delete().include(p=> p.details)',
    'Orders.deleteAll()',
    'Orders.deleteAll().include(p=> p.details)'
  ]
  for (const p in expressions) {
    const expression = expressions[p]
    // const node = orm.node.parse(expression)
    const expressionComplete = orm.expression(expression).complete('northwind:0.0.2')
    console.log(expression)
    // console.log(expression2)
    console.log(expressionComplete)
  }
}
(async () => {
  try {
    await orm.init(path.join(process.cwd(), 'src/test/config.yaml'))
    await toExpression()
  } catch (error) {
    console.log(error)
  }
})()
