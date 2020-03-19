import * as React from 'react';
import { PageLayout, List } from 'components';
import { NextPage, NextPageContext } from 'next';
import { Typography, Divider, makeStyles } from '@material-ui/core';
import { Store } from 'redux';
import { withRedux, useTopArticles, useTopEvents } from 'stores';
import { Routes } from 'constants/routes';
import { loadArticlesData, loadEventsData } from 'common';
import { IUseList, ListPageProps } from 'hocs';
import { Article } from 'models';

const useStyles = makeStyles(theme => ({
  topList: {
    padding: theme.spacing(2, 0),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  head: {
    textAlign: 'center',
  },
  container: {
    marginBottom: theme.spacing(2),
  },
  list: {
    marginBottom: theme.spacing(1),
  }
}));

const TopList = ({ title, route, useList }: { title: string; route: string; useList: (reduxStore?: Store) => IUseList<Article> }) => {
  const classes = useStyles();
  const { list } = useList();
  return (
    <div className={classes.container}>
    {/* <Paper elevation={0} className={classes.topList}> */}
      <Typography variant="h6" gutterBottom className={classes.head}>
        {title}
      </Typography>
      <List items={list} route={route} className={classes.list}/>
      <Divider />    
    {/* </Paper> */}
    </div>
  );
};

const IndexPage: NextPage = () => {
  return (
    <PageLayout title="X-island">
      <TopList title="6 последних статей" route={Routes.articles} useList={useTopArticles} />
      <TopList title="6 ближайших событий" route={Routes.events} useList={useTopEvents} />
    </PageLayout>
  );
};

const getInitialPropsData = async <T extends object>(
  reduxStore: Store,
  useList: (reduxStore?: Store) => IUseList<T>,
  loadData: (page: number) => Promise<ListPageProps<T>>,
): Promise<void> => {
  const { list, setList, setTotalPages } = useList(reduxStore);
  if (list.length === 0) {
    const listPage = await loadData(1);
    setList(listPage?.pagination?.content || []);
    setTotalPages(listPage?.pagination?.totalPages || 0);
  }
};

IndexPage.getInitialProps = async ({ reduxStore }: NextPageContext & { reduxStore: Store }) => {
  await getInitialPropsData(reduxStore, useTopArticles, loadArticlesData(6));
  await getInitialPropsData(reduxStore, useTopEvents, loadEventsData(6));
};

export default withRedux(IndexPage);
