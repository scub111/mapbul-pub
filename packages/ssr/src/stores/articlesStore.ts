import { useSelector, useDispatch } from 'react-redux';
import { Article } from 'models';
import { articlesActions } from 'actions';
import { IRootState } from 'reducers';
import { Store, Dispatch } from 'redux';

export const useArticles = (reduxStore?: Store) => {
  let articles:Array<Article> = [];
  let currentPage = 0;
  let totalPages = 0;
  let dispatch: Dispatch<any>;
  if (!reduxStore) {
    articles = useSelector((state: IRootState) => state.articles.list);
    currentPage = useSelector((state: IRootState) => state.articles.currentPage);
    totalPages = useSelector((state: IRootState) => state.articles.totalPages);
    dispatch = useDispatch();
  } else {
    dispatch = reduxStore.dispatch;
  }
  
  const incrementCurrentPage = () => dispatch(articlesActions.incrementCurrentPage());
  const setArticles = (newArticles: Array<Article>) => dispatch(articlesActions.setArticles(newArticles));
  const addArticles = (newArticles: Array<Article>) => dispatch(articlesActions.addArticles(newArticles));
  const setTotalPages = (totalPages: number) => dispatch(articlesActions.setTotalPages(totalPages));
  return { articles, currentPage, totalPages, incrementCurrentPage, setArticles, addArticles, setTotalPages };
};
