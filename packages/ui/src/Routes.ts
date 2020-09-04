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

export type TypeRoute =
  | 'articles'
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
  | 'places'
  | 'markers'
  | 'statuses' 
  | 'unknown';

export const Routes: { [key in TypeRoute]: TypeRoute } = {
  articles: 'articles',
  admins: 'admins',
  categories: 'categories',
  editors: 'editors',
  events: 'events',
  guides: 'guides',
  journalists: 'journalists',
  tenants: 'tenants',
  users: 'users',
  usertypes: 'usertypes',
  places: 'places',
  markers: 'markers',
  statuses: 'statuses',
  unknown: 'unknown',
};
