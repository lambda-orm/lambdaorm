/* eslint-disable no-use-before-define */

export interface NewValue
{
	name:string
	new:any
}
export interface UnchangedValue
{
	name:string
	value:any
}
export interface RemovedValue
{
	name:string
	old:any
}

export class Delta {
	public new:NewValue[]
	public changed:ChangedValue[]
	public unchanged:UnchangedValue[]
	public remove:RemovedValue[]
	public children:ChildDelta[]
	constructor () {
		this.new = []
		this.changed = []
		this.unchanged = []
		this.remove = []
		this.children = []
	}
}
export interface ChildDelta
{
	name:string
	type:string
	change:boolean
	delta:Delta
}
export interface ChangedValue
{
	name:string
	new:any
	old:any
	delta:Delta|null
}
