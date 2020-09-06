import * as React from 'react';

import PostIcon from '@material-ui/icons/Book';
import CategoryIcon from '@material-ui/icons/Category';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PublicIcon from '@material-ui/icons/Public';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import DoneAllIcon from '@material-ui/icons/DoneAll';

import { Routes } from '@mapbul-pub/ui';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from './ra-data-json-server';

import {
   Dashboard,
   ArticleList,
   ArticleEdit,
   ArticleCreate,
   CategoryList,
   CategoryEdit,
   CategoryCreate,
   StatusList,
   StatusEdit,
   StatusCreate,
   MarkerList,
   MarkerEdit,
   MarkerCreate,
   CityList,
   CityEdit,
   CityCreate,
   CountryList,
   CountryEdit,
   CountryCreate
} from 'pages';

import authProvider from './authProvider';
import { GlobalVar } from 'src/constants';

import { createBrowserHistory } from 'history';
// const history = createBrowserHistory({ basename: '/12' });
const history = createBrowserHistory();

const App = () => (
   <Admin
      title="Admin panel"
      dataProvider={jsonServerProvider(GlobalVar.env.baseUrl)}
      authProvider={authProvider}
      dashboard={Dashboard}
      // history={history}
   >
      <Resource
         name={Routes.articles}
         icon={PostIcon}
         list={ArticleList}
         edit={ArticleEdit}
         create={ArticleCreate}
      />
      <Resource
         name={Routes.categories}
         icon={CategoryIcon}
         list={CategoryList}
         edit={CategoryEdit}
         create={CategoryCreate}
      />
      <Resource
         name={Routes.statuses}
         icon={DoneAllIcon}
         list={StatusList}
         edit={StatusEdit}
         create={StatusCreate}
      />
      <Resource
         name={Routes.markers}
         icon={LocationOnIcon}
         list={MarkerList}
         edit={MarkerEdit}
         create={MarkerCreate}
      />
      <Resource
         name={Routes.cities}
         icon={LocationCityIcon}
         list={CityList}
         edit={CityEdit}
         create={CityCreate}
      />
      <Resource
         name={Routes.countries}
         icon={PublicIcon}
         list={CountryList}
         edit={CountryEdit}
         create={CountryCreate}
      />
   </Admin>
);
export default App;
