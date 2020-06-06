import * as React from 'react';
import { render } from 'react-dom';
import { Base } from './';
import { Router } from 'react-router-dom';
import stores from 'stores';

function App() {
  return (
    <Router history={stores.routing.history}>
      <Base apiPrefix="zpreg-priv" basename="admin"/>
    </Router>
  );
}

render(<App />, document.getElementById('root'));
