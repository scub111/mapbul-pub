import * as React from 'react';
import { Routes } from '@mapbul-pub/ui';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import { Admin, Resource, ListGuesser } from 'react-admin';
// import jsonServerProvider from 'ra-data-json-server';
import jsonServerProvider from './ra-data-json-server';

import { PostList, PostEdit, PostCreate, PostShow } from './posts';
import { UserList } from './users';
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
      // name="posts"
      icon={PostIcon}
      list={PostList}
      edit={PostEdit}
      create={PostCreate}
      show={PostShow}
    />
    <Resource name={Routes.categories} icon={UserIcon} list={UserList} />
    <Resource name="comments" list={ListGuesser} />
  </Admin>
);
export default App;
