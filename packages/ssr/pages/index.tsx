import * as React from 'react';
import { PageLayout, List } from 'components';
import { NextPage, NextPageContext } from 'next';
import { makeStyles, Typography, Paper } from '@material-ui/core';
import { Store } from 'redux';
import { withRedux, useTopArticles } from 'stores';
import { Routes } from 'constants/routes';
import { loadArticlesData } from 'common';
import { IUseList, ListPageProps } from 'hocs';
import { Article } from 'models';

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/user/erondu)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
  },
}));

const TopList = ({ useList }: { useList: (reduxStore?: Store) => IUseList<Article> }) => {
  const classes = useStyles();
  const { list } = useList();
  return (
    <Paper elevation={0} className={classes.sidebarAboutBox}>
      <Typography variant="h6" gutterBottom>
        Последние 4 статьи
      </Typography>
      {/* <Divider /> */}
      <List items={list} route={Routes.articles} />
    </Paper>
  );
};

const IndexPage: NextPage = () => {
  return (
    <PageLayout title="Mapbul">
      <TopList useList={useTopArticles} />
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
  await getInitialPropsData(reduxStore, useTopArticles, loadArticlesData(4));
  await getInitialPropsData(reduxStore, useTopArticles, loadArticlesData(4));
};

export default withRedux(IndexPage);
