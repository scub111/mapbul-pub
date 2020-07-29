import * as React from 'react';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import * as waitUntil from 'async-wait-until';
import * as nock from 'nock';
import Posts from 'app/components/Posts';

configure({ adapter: new Adapter() });

jest.mock('app/services/api');

describe('<Posts />', () => {
   // beforeAll(() => {
   //    nock('https://jsonplaceholder.typicode.com')
   //       .get('/posts')
   //       .reply(200,
   //          [
   //             {
   //                body:
   //                   'quia et suscipit↵suscipit recusandae consequuntur expedita et cum↵reprehenderit molestiae ut ut quas totam↵nostrum rerum est autem sunt rem eveniet architecto',
   //                id: 1,
   //                title:
   //                   'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
   //                userId: 1
   //             }
   //          ]
   //       );
   // });

   it('Posts renders', async () => {
      const wrapper = shallow(<Posts />).dive();

      await waitUntil(() => {
         const posts: any = wrapper.props();
         // const posts = props.posts;
         console.log(posts);
         // console.log(wrapper.state());
         return posts && posts.length > 0;
      });

      // console.log(wrapper.html());
      expect(wrapper.html()).toContain('Posts');
      expect(wrapper.html()).toContain(
         'sunt aut facere repellat provident occaecati excepturi optio reprehenderit'
      );

      // setImmediate(() => {
      //    // console.log(wrapper.html());

      //    // console.log(wrapper.state('posts'));
      //    done();
      // }, 0);
   });
});
