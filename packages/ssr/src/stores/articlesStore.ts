import { useSelector, useDispatch } from 'react-redux';
import { Article } from 'models';
import { articlesActions } from 'actions';
import { IRootState } from 'reducers';

export const useArticles = () => {
  const articles = useSelector((state: IRootState) => state.articles.list);
  const currentPage = useSelector((state: IRootState) => state.articles.currentPage);
  const totalPages = useSelector((state: IRootState) => state.articles.totalPages);
  const dispatch = useDispatch();
  const incrementCurrentPage = () => dispatch(articlesActions.incrementCurrentPage());
  const setArticles = (newArticles: Array<Article>) => dispatch(articlesActions.setArticles(newArticles));
  const addArticles = (newArticles: Array<Article>) => dispatch(articlesActions.addArticles(newArticles));
  const setTotalPages = (totalPages: number) => dispatch(articlesActions.setTotalPages(totalPages));
  return { articles, currentPage, totalPages, incrementCurrentPage, setArticles, addArticles, setTotalPages };
};
