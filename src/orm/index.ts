import { Orm } from './orm'

// export * from './model/index'
// export * from './language/dialect'
// export * from './helper'
// export * from './connection/index'
export * from './model'
export { Helper } from './helper'
export { Orm } from './orm'
export const orm = Orm.instance
