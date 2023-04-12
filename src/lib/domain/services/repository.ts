// import { QueryInfo, MetadataParameter, MetadataModel, MetadataConstraint, Metadata } from '..'

// export interface IExpressionActions {
// execute (expression: string, data:any): Promise<any>
// normalize (expression: string): string
// model (expression: string): Promise<MetadataModel[]>
// parameters (expression: string): Promise<MetadataParameter[]>
// constraints (expression: string): Promise<MetadataConstraint>
// metadata (expression: string): Promise<Metadata>
// getInfo (expression: string): Promise<QueryInfo>
// }
// export interface IQueryAction {
// execute (data: any): Promise<any>
// normalize ():string
// model ():Promise<MetadataModel[]>
// constraints ():Promise<MetadataConstraint>
// parameters ():Promise<MetadataParameter[]>
// sentence ():Promise<QueryInfo>
// metadata ():Promise<Metadata>
// }

// interface IPageClauses extends IQueryAction {
// /**  */
// page (page:number, records:number): IQueryAction
// }
// interface MapClauses<T> extends IPageClauses {
// /**  */
// sort (predicate: (value: T, index: number, array: T[]) => unknown): PageClauses {
// return new PageClauses(this.actions, `${this.expression}.sort(${predicate.toString()})`)
// }
// }
// class Map2Clauses<T> extends QueryAction {
// /**  */
// sort (predicate: (value: T, index: number, array: T[]) => unknown): PageClauses {
// return new PageClauses(this.actions, `${this.expression}.sort(${predicate.toString()})`)
// }
// }
// class HavingClauses<T> extends MapClauses<T> {
// /**  */
// map<U> (predicate: (value: T, index: number, array: T[]) => U): MapClauses<U> {
// return new MapClauses(this.actions, `${this.expression}.map(${predicate.toString()})`)
// }

// /**  */
// first<U> (predicate: (value: T, index: number, array: T[]) => U): Map2Clauses<U> {
// return new Map2Clauses(this.actions, `${this.expression}.first(${predicate.toString()})`)
// }

// /**  */
// last<U> (predicate: (value: T, index: number, array: T[]) => U): Map2Clauses<U> {
// return new Map2Clauses(this.actions, `${this.expression}.last(${predicate.toString()})`)
// }

// /**  */
// distinct<U> (predicate: (value: T, index: number, array: T[]) => U): MapClauses<U> {
// return new MapClauses(this.actions, `${this.expression}.distinct(${predicate.toString()})`)
// }
// }
// class FilterIncludeClauses<T> extends HavingClauses<T> {
// /**  */
// having (predicate: (value: T, index: number, array: T[]) => unknown): HavingClauses<T> {
// return new HavingClauses(this.actions, `${this.expression}.having(${predicate.toString()})`)
// }
// }
// class IncludeClauses<T> extends HavingClauses<T> {
// /**  */
// filter (predicate: (value: T, index: number, array: T[]) => unknown): FilterIncludeClauses<T> {
// return new FilterIncludeClauses(this.actions, `${this.expression}.filter(${predicate.toString()})`)
// }

// /**  */
// having (predicate: (value: T, index: number, array: T[]) => unknown): HavingClauses<T> {
// return new HavingClauses(this.actions, `${this.expression}.having(${predicate.toString()})`)
// }
// }
// class FilterClauses<T> extends HavingClauses<T> {
// /**  */
// include (predicate: (value: T, index: number, array: T[]) => unknown): IncludeClauses<T> {
// return new IncludeClauses(this.actions, `${this.expression}.include(${predicate.toString()})`)
// }

// /**  */
// having (predicate: (value: T, index: number, array: T[]) => unknown): HavingClauses<T> {
// return new HavingClauses(this.actions, `${this.expression}.having(${predicate.toString()})`)
// }
// }

// class Filter<T> extends QueryAction {
// /**  */
// filter (predicate: (value: T, index: number, array: T[]) => unknown): QueryAction {
// return new QueryAction(this.actions, `${this.expression}.filter(${predicate.toString()})`)
// }
// }

// class Include<T> extends QueryAction {
// /**  */
// include (predicate: (value: T, index: number, array: T[]) => unknown): QueryAction {
// return new QueryAction(this.actions, `${this.expression}.include(${predicate.toString()})`)
// }
// }

// class ModificableClauses<T> extends QueryAction {
// /**  */
// filter (predicate: (value: T, index: number, array: T[]) => unknown): QueryAction {
// return new QueryAction(this.actions, `${this.expression}.filter(${predicate.toString()})`)
// }

// /**  */
// include (predicate: (value: T, index: number, array: T[]) => unknown): Filter<T> {
// return new IncludeClauses(this.actions, `${this.expression}.include(${predicate.toString()})`)
// }
// }

// export class Queryable<T> extends HavingClauses<T> {
// /**  */
// filter (predicate: (value: T, index: number, array: T[]) => unknown): FilterClauses<T> {
// return new FilterClauses(this.actions, `${this.expression}.filter(${predicate.toString()})`)
// }

// /**  */
// include (predicate: (value: T, index: number, array: T[]) => unknown): IncludeClauses<T> {
// return new IncludeClauses(this.actions, `${this.expression}.include(${predicate.toString()})`)
// }

// /**  */
// having (predicate: (value: T, index: number, array: T[]) => unknown): HavingClauses<T> {
// return new HavingClauses(this.actions, `${this.expression}.having(${predicate.toString()})`)
// }

// /**  */
// insert (value?: T): ModificableClauses<T> {
// return new ModificableClauses(this.actions, `${this.expression}.insert(${value !== undefined ? JSON.stringify(value) : ''})`)
// }

// /**  */
// bulkInsert (value?: T): ModificableClauses<T> {
// return new ModificableClauses(this.actions, `${this.expression}.bulkInsert(${value !== undefined ? JSON.stringify(value) : ''})`)
// }

// /**  */
// update (predicate: (value: T, index: number, array: T[]) => unknown): ModificableClauses<T> {
// return new ModificableClauses(this.actions, `${this.expression}.update(${predicate.toString()})`)
// }

// /**  */
// updateAll (predicate: (value: T, index: number, array: T[]) => unknown): Include<T> {
// return new Include(this.actions, `${this.expression}.updateAll(${predicate.toString()})`)
// }

// /**  */
// delete (): ModificableClauses<T> {
// return new ModificableClauses(this.actions, `${this.expression}.delete()`)
// }

// /**  */
// deleteAll (): Include<T> {
// return new Include(this.actions, `${this.expression}.deleteAll()`)
// }
// }
