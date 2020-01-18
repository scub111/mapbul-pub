import { useSelector, useDispatch } from 'react-redux';
// import { IArticlesState } from 'reducers';
import { Article } from 'models';
import { counterActions } from 'actions';
import { IRootState } from 'reducers';

export const useArticles = () => {
  const articles = useSelector((state: IRootState) => state.articles.list);
  const dispatch = useDispatch();
  const setArticles = (newArticles: Array<Article>) => dispatch(counterActions.setArticles(newArticles));
  const addArticles = (newArticles: Array<Article>) => dispatch(counterActions.addArticles(newArticles));
  return { articles, setArticles, addArticles };
};
