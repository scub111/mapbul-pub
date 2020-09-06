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
  | 'admins'
  | 'articles'
  | 'articlesubcategories'
  | 'categories'
  | 'cities'
  | 'citypermissions'
  | 'countries'
  | 'countrypermissions'
  | 'discounts'
  | 'editors'
  | 'favoritesarticles'
  | 'favoritesmarkers'
  | 'guides'
  | 'journalists'
  | 'markers'
  | 'markerphotos'
  | 'markerrequestsessions'
  | 'phones'
  | 'regions'
  | 'regionpermissions'
  | 'statuses'
  | 'subcategories'
  | 'tenants'
  | 'users'
  | 'usertypes'
  | 'weekdays'
  | 'worktimes'
  //Custom
  | 'places'
  | 'events'
  | 'unknown';

export const Routes: { [key in TypeRoute]: TypeRoute } = {
  admins: 'admins',
  articles: 'articles',
  articlesubcategories: 'articlesubcategories',
  categories: 'categories',
  cities: 'cities',
  citypermissions: 'citypermissions',
  countries: 'countries',
  countrypermissions: 'countrypermissions',
  discounts: 'discounts',
  editors: 'editors',
  favoritesarticles: 'favoritesarticles',
  favoritesmarkers: 'favoritesmarkers',
  guides: 'guides',
  journalists: 'journalists',
  markers: 'markers',
  markerphotos: 'markerphotos',
  markerrequestsessions: 'markerrequestsessions',
  phones: 'phones',
  regions: 'regions',
  regionpermissions: 'regionpermissions',
  statuses: 'statuses',
  subcategories: 'subcategories',
  tenants: 'tenants',
  users: 'users',
  usertypes: 'usertypes',
  weekdays: 'weekdays',
  worktimes: 'worktimes',
  //Custom
  places: 'places',
  events: 'events',
  unknown: 'unknown',
};
