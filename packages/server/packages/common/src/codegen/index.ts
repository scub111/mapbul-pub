if (process.env.NODE_ENV !== 'development') {
  require('module-alias/register');
  console.log('module-alias/register');
}
console.log('test2');
import { setEnvVariables } from 'common/serverConfig';
setEnvVariables(__dirname + '/.env');

import { generateController } from './generateController';

const main = async () => {
  const t0 = new Date();
  // await generateController('admin', 'admins');
  // await generateController('article', 'articles');
  // await generateController('articlesubcategory', 'articlesubcategories');
  // await generateController('category', 'categories');
  // await generateController('city', 'cities');
  // await generateController('city_permission', 'city_permissions');
  // await generateController('country', 'countries');
  await generateController('country_permission', 'countryPermission', 'countryPermissions');
  // await generateController('discount', 'discounts');
  // await generateController('editor', 'editors');
  // await generateController('favorites_article', 'favorites_articles');
  // await generateController('favorites_marker', 'favorites_markers');
  // await generateController('guide', 'guides');
  // await generateController('journalist', 'journalists');
  // await generateController('marker', 'markers');
  // await generateController('marker_photos', 'marker_photos');
  // await generateController('marker_request_session', 'marker_request_sessions');
  // await generateController('phone', 'phones');
  // await generateController('region', 'regions');
  // await generateController('region_permission', 'region_permissions');
  // await generateController('status', 'statuses');
  // await generateController('subcategory', 'subcategories');
  // await generateController('tenant', 'tenants');
  // await generateController('user', 'users');
  // await generateController('usertype', 'usertypes');
  // await generateController('weekday', 'weekdays');
  // await generateController('worktime', 'worktimes');
  const diff = new Date().valueOf() - t0.valueOf();
  console.log(`${diff} ms`);
};

main();
