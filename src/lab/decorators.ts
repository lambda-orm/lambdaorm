/*
interface Mappingdescriptor
{
    name:string
}

function Mapping(name: string) {
    return function (target: any, propertyKey: string, descriptor: Mappingdescriptor) {
      descriptor.name = name;
    };
}
*/

export function Entity(mapping: string): ClassDecorator
{  
  return function (target) {
    console.log("mapping:"+mapping);
  };
}  
export function Property(mapping?:string,nullable:boolean=true,primaryKey:boolean=false,autoincrement:boolean=false): PropertyDecorator
{
  return function (object: Object, propertyName: string|Symbol) {
    console.log("mapping:"+mapping);  
    console.log("mapping:"+nullable);  
    console.log("mapping:"+primaryKey);  
    console.log("mapping:"+autoincrement);    
  };
  //  return function (object: Object, propertyName: string):void {
  //   console.log("mapping:"+mapping);      
  //   };
}
export function Relation(type:'oneToMany'| 'oneToOne'|'manyToOne' ,from:string,to:string): Function
{
    return () => {
      return;
    };
}

