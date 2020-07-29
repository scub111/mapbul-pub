import * as React from 'react';
import { Routes } from '@mapbul-pub/ui';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import { Admin, Resource, ListGuesser } from 'react-admin';
// import jsonServerProvider from 'ra-data-json-server';
import jsonServerProvider from './ra-data-json-server';

import { ArticleList, ArticleEdit, ArticleCreate, ArticleShow } from './articles';
import { CategoryList } from './users';
import Dashboard from './Dashboard';
import authProvider from './authProvider';

const App = () => (
  <Admin
    dataProvider={jsonServerProvider(
      // 'https://jsonplaceholder.typicode.com'
      'http://localhost:3100/api'
    )}
    authProvider={authProvider}
    dashboard={Dashboard}
  >
    <Resource
      name={Routes.articles}
      icon={PostIcon}
      list={ArticleList}
      edit={ArticleEdit}
      create={ArticleCreate}
      show={ArticleShow}
    />
    <Resource name={Routes.categories} icon={UserIcon} list={CategoryList} />
    <Resource name="comments" list={ListGuesser} />
  </Admin>
);
export default App;
