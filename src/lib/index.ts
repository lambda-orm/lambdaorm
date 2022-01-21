import { Orm } from './manager/orm'

// export * from './model/index'
// export * from './language/dialect'
// export * from './helper'
// export * from './connection/index'
export * from './model'
export * from './repository'
export { Helper } from './manager/helper'
export { Orm } from './manager/orm'
export const orm = Orm.instance
