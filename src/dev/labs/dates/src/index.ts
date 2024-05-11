// import { orm } from '../../../../lib'
// import { Test } from './domain/model'

// (async () => {
// try {
// const workspace = __dirname.replace('/build/','/src/')
// await orm.init(workspace + '/../lambdaORM.yaml')
// const test:Test = { id: 1, description: 'from new Date()', testDate: new Date(), testDateTime: new Date(), testString: new Date().toISOString() }
// for(const stage of ['MySQL','PostgreSQL','SqlServer','MongoDB','Oracle']){
// await orm.execute('Tests.deleteAll()',{}, { stage })		
// }	
// const inserts:any[] = []
// for(const stage of ['MySQL','PostgreSQL','SqlServer','MongoDB','Oracle']){
// const result = await orm.execute('Tests.insert()',test, { stage })		
// inserts.push(result)
// }			
// const results:any[]=[]
// for(const stage of ['MySQL','PostgreSQL','SqlServer','MongoDB','Oracle']){
// const result = await orm.execute('Tests',{}, { stage })		
// results.push(result)
// }
// await orm.helper.fs.write(workspace + '/results.json', JSON.stringify(results,null,2))	
// } catch (error: any) {
// console.error(error)
// } finally{
// await orm.end()
// }
// })()
