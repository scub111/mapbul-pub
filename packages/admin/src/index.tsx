import * as React from 'react';
import { render } from 'react-dom';
// import App2 from 'containers/App';
import App from './App';
import { sum } from './foo';

// render(<App2 message="Hello World 1++++" />, document.getElementById('root'));
render(<App />, document.getElementById('root'));

console.log(sum(2, 6).toString());
