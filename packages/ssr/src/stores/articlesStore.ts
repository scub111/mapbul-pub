import { useSelector, useDispatch } from 'react-redux';
import { Article } from 'models';
import { articlesActions } from 'actions';
import { IRootState } from 'reducers';

export const useArticles = () => {
  const articles = useSelector((state: IRootState) => state.articles.list);
  const dispatch = useDispatch();
  const setArticles = (newArticles: Array<Article>) => dispatch(articlesActions.setArticles(newArticles));
  const addArticles = (newArticles: Array<Article>) => dispatch(articlesActions.addArticles(newArticles));
  return { articles, setArticles, addArticles };
};
