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


  
export function Mapping(value: string): Function
{
    return () => {
      return;
    };
}
export function NotNull(): Function
{
    return () => {
      return;
    };
}
export function PrimaryKey(): Function
{
    return () => {
      return;
    };
}
export function Autoincrement(): Function
{
    return () => {
      return;
    };
}

export enum RelationType
{OneToMany = 'oneToMany'
,OneToOne = 'oneToOne'
,ManyToOne = 'manyToOne'
}

export function Relation(type: RelationType,from:string,to:string): Function
{
    return () => {
      return;
    };
}

