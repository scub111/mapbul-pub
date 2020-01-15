import { useSelector, useDispatch } from "react-redux";
import { IState } from "reducers";
import { Article } from "models";

export const useArticles = () => {
  const articles = useSelector((state: IState) => state.articles);
  const dispatch = useDispatch();
  const setArticles = (newArticles: Array<Article>) =>
    dispatch({
      type: 'SET_ARTICLES',
      payload: newArticles,
    });
  const addArticles = (newArticles: Array<Article>) =>
    dispatch({
      type: 'ADD_ARTICLES',
      payload: newArticles,
    });
  return {articles, setArticles, addArticles};
}