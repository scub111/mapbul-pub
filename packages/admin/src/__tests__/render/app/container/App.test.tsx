import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import App from 'app/containers/App';

it('Renders App', () => {
   const div = document.createElement('div');
   render(<App message="Hello" />, div);
   console.log(div.innerHTML);
   // unmountComponentAtNode(div);
});
