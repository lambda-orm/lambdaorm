/* eslint-disable no-use-before-define */
// THIS FILE IS NOT EDITABLE, IS MANAGED BY LAMBDA ORM
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Queryable, OneToMany, ManyToOne, OneToOne } from 'lambdaorm'
export class Test {
	id?: number
	description?: string
	testDate?: Date
	testDateTime?: Date
	testDateTime2?: Date
	testDateTimeOffset?: Date
	testString?: string
}
export interface QryTest {
	id: number
	description: string
	testDate: Date
	testDateTime: Date
	testDateTime2: Date
	testDateTimeOffset: Date
	testString: string
}
export let Tests: Queryable<QryTest>
