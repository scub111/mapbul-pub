import { ListPageProps } from 'components';
import { NextPage } from 'next';
import { withRedux } from 'stores';
import { Counter } from 'ssr/src/components/Counter';

const CounterPage: NextPage<ListPageProps> = () => {
  return <Counter />;
};

export default withRedux(CounterPage);
