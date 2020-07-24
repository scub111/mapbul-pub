import * as React from 'react';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import PostForm from 'app/components/PostForm';

configure({ adapter: new Adapter() });

jest.mock('app/services/api');

describe('<PostForm />', () => {
   it('PostForm renders', async () => {
      const wrapper = shallow(<PostForm />);
      // console.log(wrapper.html());
      expect(wrapper.html()).toContain('Post form');
   });
});
