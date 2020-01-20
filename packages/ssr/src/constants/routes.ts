// export enum Routes {
//   articles = 'articles',
//   admins = 'admins',
//   categories = 'categories',
//   editors = 'editors',
//   events = 'events',
//   guides = 'guides',
//   journalists = 'journalists',
//   tenants = 'tenants',
//   users = 'users',
//   userTypes = 'usertypes',
// }

export type TypeRoutes = 'articles' 
| 'articles'
| 'admins'
| 'categories'
| 'editors'
| 'events'
| 'guides'
| 'journalists'
| 'tenants'
| 'users'
| 'usertypes'
| 'unknown'

export const Routes: {[key: string]: TypeRoutes} = {
  articles: 'articles',
  admins: 'admins',
  categories: 'categories',
  editors: 'editors',
  events: 'events',
  guides: 'guides',
  journalists: 'journalists',
  tenants: 'tenants',
  users: 'users',
  userTypes: 'usertypes',
  unknown: 'unknown',
}
