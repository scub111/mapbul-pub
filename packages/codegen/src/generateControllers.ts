// if (process.env.NODE_ENV !== 'development') {
//   require('module-alias/register');
//   console.log('module-alias/register');
// }
import appRootPath from 'app-root-path';
import { generateController } from 'codegenSrc/generateController';
import { generateCommonTypes } from 'codegenSrc/generateCommonTypes';
import { deleteRouterSync } from 'codegenSrc/routerStorage';
// import { sleep } from 'scub111-common';
import { GlobalVar, dbConnectionSingleton } from '@mapbul-pub/common';

export const generateControllers = async () => {
  console.log('test5');
  // await sleep(1000);
  const t0 = new Date();
  GlobalVar.setup(`${appRootPath}/.env`);
  const dbConnection = dbConnectionSingleton.getInstance();
  deleteRouterSync();
  await generateController({
    connection: dbConnection,
    tableName: 'admin',
    dto: 'admin',
    service: 'admins',
  });
  await generateController({
    connection: dbConnection,
    tableName: 'article',
    dto: 'article',
    service: 'articles',
  });
  await generateController({
    connection: dbConnection,
    tableName: 'articlesubcategory',
    dto: 'articleSubcategory',
    service: 'articleSubcategories',
  });
  await generateController({
    connection: dbConnection,
    tableName: 'category',
    dto: 'category',
    service: 'categories',
  });
  await generateController({
    connection: dbConnection,
    tableName: 'city',
    dto: 'city',
    service: 'cities',
  });
  await generateController({
    connection: dbConnection,
    tableName: 'city_permission',
    dto: 'cityPermission',
    service: 'cityPermissions',
  });
  await generateController({
    connection: dbConnection,
    tableName: 'country',
    dto: 'country',
    service: 'countries',
  });
  await generateController({
    connection: dbConnection,
    tableName: 'country_permission',
    dto: 'countryPermission',
    service: 'countryPermissions',
  });
  await generateController({
    connection: dbConnection,
    tableName: 'discount',
    dto: 'discount',
    service: 'discounts',
  });
  await generateController({
    connection: dbConnection,
    tableName: 'editor',
    dto: 'editor',
    service: 'editors',
  });
  await generateController({
    connection: dbConnection,
    tableName: 'favorites_article',
    dto: 'favoritesArticle',
    service: 'favoritesArticles',
  });
  await generateController({
    connection: dbConnection,
    tableName: 'favorites_marker',
    dto: 'favoritesMarker',
    service: 'favoritesMarkers',
  });
  await generateController({
    connection: dbConnection,
    tableName: 'guide',
    dto: 'guide',
    service: 'guides',
  });
  await generateController({
    connection: dbConnection,
    tableName: 'journalist',
    dto: 'journalist',
    service: 'journalists',
  });
  await generateController({
    connection: dbConnection,
    tableName: 'marker',
    dto: 'marker',
    service: 'markers',
    map: {
      needRequest: true,
      replaceValues: [
        {
          field: 'userId',
          value: 'req.user.id'
        }
      ]
    }
  });
  await generateController({
    connection: dbConnection,
    tableName: 'marker_photos',
    dto: 'markerPhotos',
    service: 'markerPhotos',
  });
  await generateController({
    connection: dbConnection,
    tableName: 'marker_request_session',
    dto: 'markerRequestSession',
    service: 'markerRequestSessions',
  });
  await generateController({
    connection: dbConnection,
    tableName: 'phone',
    dto: 'phone',
    service: 'phones',
  });
  await generateController({
    connection: dbConnection,
    tableName: 'region',
    dto: 'region',
    service: 'regions',
  });
  await generateController({
    connection: dbConnection,
    tableName: 'region_permission',
    dto: 'regionPermission',
    service: 'regionPermissions',
  });
  await generateController({
    connection: dbConnection,
    tableName: 'status',
    dto: 'status',
    service: 'statuses',
  });
  await generateController({
    connection: dbConnection,
    tableName: 'subcategory',
    dto: 'subcategory',
    service: 'subcategories',
  });
  await generateController({
    connection: dbConnection,
    tableName: 'tenant',
    dto: 'tenant',
    service: 'tenants',
  });
  await generateController({
    connection: dbConnection,
    tableName: 'user',
    dto: 'user',
    service: 'users',
    skipReadFields: ['password'],
  });
  await generateController({
    connection: dbConnection,
    tableName: 'usertype',
    dto: 'userType',
    service: 'userTypes',
  });
  await generateController({
    connection: dbConnection,
    tableName: 'weekday',
    dto: 'weekDay',
    service: 'weekDays',
  });
  await generateController({
    connection: dbConnection,
    tableName: 'worktime',
    dto: 'workTime',
    service: 'workTimes',
  });
  dbConnection.disconnect();
  const diff = new Date().valueOf() - t0.valueOf();
  await generateCommonTypes();
  console.log(`${diff} ms`);
};
