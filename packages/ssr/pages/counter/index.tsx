import { NextPage } from 'next';
import { withRedux } from 'stores';
import { Counter } from 'ssr/src/components/Counter';

const CounterPage: NextPage = () => {
  return <Counter />;
};

export default withRedux(CounterPage);
