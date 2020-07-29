import * as React from 'react';
import { render } from 'react-dom';
// import App2 from 'app/containers/App';
import { sum } from 'app/foo';
import App from './App';

// render(<App2 message="Hello World 1++++" />, document.getElementById('root'));
render(<App />, document.getElementById('root'));

console.log(sum(2, 6).toString());
