


//https://docs.ponyorm.org/
//https://github.com/ponyorm/pony/
//https://www.fullstackpython.com/object-relational-mappers-orms.html
//https://www.dabapps.com/blog/django-models-and-encapsulation/

// function sql(conection,sentence);

// MySource = {

//     Product: [ {category:'a',name:'b',cost:12.2 }]
//     ,
// }
// MySource.Product.select(p=> ({category:p.category,total:sum(p.cost)}) )
//                 .filter(p=> p.category != null && p.total > 100 )
//                 .sort(p=> p.category);




class Orm {

    exec(sentence,args){
        const fnString = Function.prototype.toString.call(sentence);
        console.log(fnString)
        console.log(args)
    }
}
orm = new Orm()





//example query with having
orm.exec(()=> Product.select(p=> ({category:p.category.name,total:sum(p.cost)}) )
                     .where(p=> p.category != a )                     
                     .having(p=> p.total > 100  )
                     .sort(p=> desc(p.category) )
        ,{a:1} );

// Filter using subquery 
orm.exec(()=> Product.select(p=> p.category.name,as(sum(p.cost),'total'))
        .where( p=> p.category != a && !exists(Blacklist.where(q=> q.categoryId == p.categoryId))  )                     
        .having(p=> p.total > 100 )
        .sort(p=> desc(p.category) ) 
,{a:1} );

// orm.exec( select(p=> ({category:p.category,total:sum(p.cost)}) )
//           .filter(p=> p.category != null && p.total > 100 )
//           .sort(p=> p.category)
//         );

  





// a = [1,3,5,4,5];
// result =a.map(p=>({a:p,name:p.toString()}));
// console.log(result)

// users.
// filter()
// map(); //or select() //tener las dos posibilidades
// sort();


// Product = { name:a }




// sex = sex.male;
// sentence = sql(users.filter(p => year(p.firstdate) > 18 && p.sex == sex )
//                     .map(p => {name: p.firtname+' '+p.lastname,age:year(p.firstdate) })
//                     .sort(p=> p.name )
// );

// sqlExecute(sentence,{sex = sex.male})

// Product.select