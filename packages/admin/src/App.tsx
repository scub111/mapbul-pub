import * as React from 'react';

import PostIcon from '@material-ui/icons/Book';
import CategoryIcon from '@material-ui/icons/Category';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PublicIcon from '@material-ui/icons/Public';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PersonIcon from '@material-ui/icons/Person';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

import { Routes } from '@mapbul-pub/ui';
import { Admin, Resource } from 'react-admin';
import { daServer } from './services';

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
   CountryCreate,
   DiscountCreate,
   DiscountList,
   DiscountEdit,
   UserList,
   UserEdit,
   UserCreate
} from 'pages';

import authProvider from './authProvider';
import { GlobalVar } from 'src/constants';

// import { createBrowserHistory } from 'history';
import { UserTypeList, UserTypeEdit, UserTypeCreate } from './pages/UserTypes';
// const history = createBrowserHistory({ basename: '/12' });
// const history = createBrowserHistory();

const App = () => (
   <Admin
      title="Admin panel"
      dataProvider={daServer(GlobalVar.env.baseUrl)}
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
         name={Routes.markers}
         icon={LocationOnIcon}
         list={MarkerList}
         edit={MarkerEdit}
         create={MarkerCreate}
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
      <Resource
         name={Routes.discounts}
         icon={AttachMoneyIcon}
         list={DiscountList}
         edit={DiscountEdit}
         create={DiscountCreate}
      />
      <Resource
         name={Routes.users}
         icon={PersonIcon}
         list={UserList}
         edit={UserEdit}
         create={UserCreate}
      />
      <Resource
         name={Routes.usertypes}
         icon={AssignmentIndIcon}
         list={UserTypeList}
         edit={UserTypeEdit}
         create={UserTypeCreate}
      />
   </Admin>
);
export default App;
