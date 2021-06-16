import orm  from "./../orm"

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
import 'reflect-metadata';


export function Entity(mapping: string): ClassDecorator
{  
  return function (target) {
    orm.addMetadata('entity',{name:target.name,mapping:mapping})
  };
}  
export function Property(mapping?:string,nullable:boolean=true,primaryKey:boolean=false,autoincrement:boolean=false)
{
  return function (target : any, key : string) {
    const entity = target.constructor.name    
    const type = Reflect.getOwnMetadata('design:type', target, key);
    orm.addMetadata('property',{entity:entity,name:key,type:type,mapping:mapping,nullable:nullable,primaryKey:primaryKey,autoincrement:autoincrement})
  };
}
export function Relation(type:'oneToMany'| 'oneToOne'|'manyToOne' ,from:string,to:string)
{
  return function (target : any, key : string) {
    const entity = target.constructor.name 
    const toEntity = Reflect.getOwnMetadata('design:type', target, key);
    orm.addMetadata('relation',{entity:entity,name:key,from:from,toEntity:toEntity,to:to})
  };
}

