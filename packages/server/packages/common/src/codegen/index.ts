if (process.env.NODE_ENV !== 'development') {
  require('module-alias/register');
  console.log('module-alias/register');
}
import { setEnvVariables } from 'common/serverConfig';
setEnvVariables(__dirname + '/.env');

import { generateController } from 'codegen/generateController';
import { deleteRouterSync } from 'codegen/routerStorage';

const main = async () => {
  const t0 = new Date();
  deleteRouterSync();
  await generateController('admin', 'admin', 'admins');
  await generateController('article', 'article', 'articles');
  await generateController('articlesubcategory', 'articleSubcategory', 'articleSubcategories');
  await generateController('category', 'category', 'categories');
  await generateController('city', 'city', 'cities');
  await generateController('city_permission', 'cityPermission', 'cityPermissions');
  await generateController('country', 'country', 'countries');
  await generateController('country_permission', 'countryPermission', 'countryPermissions');
  await generateController('discount', 'discount', 'discounts');
  await generateController('editor', 'editors', 'editors');
  await generateController('favorites_article', 'favoritesArticle', 'favoritesArticles');
  await generateController('favorites_marker', 'favoritesMarker', 'favoritesMarkers');
  await generateController('guide', 'guide', 'guides');
  await generateController('journalist', 'journalist', 'journalists');
  await generateController('marker', 'marker', 'markers');
  await generateController('marker_photos', 'markerPhotos', 'markerPhotos');
  await generateController('marker_request_session', 'markerRequestSession', 'markerRequestSessions');
  await generateController('phone', 'phone', 'phones');
  await generateController('region', 'region', 'regions');
  await generateController('region_permission', 'regionPermission', 'regionPermissions');
  await generateController('status', 'status', 'statuses');
  await generateController('subcategory', 'subcategory', 'subcategories');
  await generateController('tenant', 'tenant', 'tenants');
  await generateController('user', 'user', 'users');
  await generateController('usertype', 'userType', 'userTypes');
  await generateController('weekday', 'weekDay', 'weekDays');
  await generateController('worktime', 'workTime', 'workTimes');
  const diff = new Date().valueOf() - t0.valueOf();
  console.log(`${diff} ms`);
};

main();
