import * as React from 'react';
import { render } from 'react-dom';
import App from 'app/containers/App';
import { sum } from 'app/foo';

render(<App message="Hello World 1++++" />, document.getElementById('root'));

console.log(sum(2, 6).toString());
