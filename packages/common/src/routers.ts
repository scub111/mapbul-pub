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
  | 'unknown';

export const Routes: { [key: string]: TypeRoute } = {
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
  places: 'places',
  markers: 'markers',
  unknown: 'unknown',
};