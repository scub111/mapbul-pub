import { useSelector, useDispatch } from 'react-redux';
import { IState } from 'reducers';
import { Article } from 'models';
import { counterActions } from 'actions';

export const useArticles = () => {
  const articles = useSelector((state: IState) => state.articles);
  const dispatch = useDispatch();
  const setArticles = (newArticles: Array<Article>) => dispatch(counterActions.setArticles(newArticles));
  const addArticles = (newArticles: Array<Article>) => dispatch(counterActions.addArticles(newArticles));
  return { articles, setArticles, addArticles };
};
