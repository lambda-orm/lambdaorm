import { Orm } from './orm'

// export * from './model/index'
// export * from './language/dialect'
// export * from './helper'
// export * from './connection/index'
export { Config, Parameter, Delta } from './model'
export { Helper } from './helper'
export const orm = Orm.instance
