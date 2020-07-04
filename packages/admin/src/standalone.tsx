import * as React from 'react';
import { render } from 'react-dom';
import { Base } from './';

function App() {
  return <Base apiPrefix="zpreg-priv" basename="admin" />;
}

render(<App />, document.getElementById('root'));
