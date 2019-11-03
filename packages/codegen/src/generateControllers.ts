// if (process.env.NODE_ENV !== 'development') {
//   require('module-alias/register');
//   console.log('module-alias/register');
// }
import appRootPath from 'app-root-path';
import { generateController } from 'codegen/generateController';
import { deleteRouterSync } from 'codegen/routerStorage';
import { sleep } from '@mapbul-pub/common';
import { GlobalVar, dbConnectionSingleton, test } from '@mapbul-pub/common';

export const generateControllers = async () => {
  console.log('test5');
  // await sleep(1000);
  test();
  const t0 = new Date();
  GlobalVar.setup(`${appRootPath}/.env`);

  // const query = initConnection();
  const dbConnection = dbConnectionSingleton.getInstance();
  dbConnection.setup();
  const query = dbConnection.query;
  deleteRouterSync();
  await generateController(query, 'admin', 'admin', 'admins');
  await generateController(query, 'article', 'article', 'articles');
  await generateController(query, 'articlesubcategory', 'articleSubcategory', 'articleSubcategories');
  await generateController(query, 'category', 'category', 'categories');
  await generateController(query, 'city', 'city', 'cities');
  await generateController(query, 'city_permission', 'cityPermission', 'cityPermissions');
  await generateController(query, 'country', 'country', 'countries');
  await generateController(query, 'country_permission', 'countryPermission', 'countryPermissions');
  await generateController(query, 'discount', 'discount', 'discounts');
  await generateController(query, 'editor', 'editors', 'editors');
  await generateController(query, 'favorites_article', 'favoritesArticle', 'favoritesArticles');
  await generateController(query, 'favorites_marker', 'favoritesMarker', 'favoritesMarkers');
  await generateController(query, 'guide', 'guide', 'guides');
  await generateController(query, 'journalist', 'journalist', 'journalists');
  await generateController(query, 'marker', 'marker', 'markers');
  await generateController(query, 'marker_photos', 'markerPhotos', 'markerPhotos');
  await generateController(query, 'marker_request_session', 'markerRequestSession', 'markerRequestSessions');
  await generateController(query, 'phone', 'phone', 'phones');
  await generateController(query, 'region', 'region', 'regions');
  await generateController(query, 'region_permission', 'regionPermission', 'regionPermissions');
  await generateController(query, 'status', 'status', 'statuses');
  await generateController(query, 'subcategory', 'subcategory', 'subcategories');
  await generateController(query, 'tenant', 'tenant', 'tenants');
  await generateController(query, 'user', 'user', 'users');
  await generateController(query, 'usertype', 'userType', 'userTypes');
  await generateController(query, 'weekday', 'weekDay', 'weekDays');
  await generateController(query, 'worktime', 'workTime', 'workTimes');
  // closeConnection();
  dbConnection.destroy();
  const diff = new Date().valueOf() - t0.valueOf();
  console.log(`${diff} ms`);
};
