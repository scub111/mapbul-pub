import { useSelector, useDispatch } from 'react-redux';
import { IActionSet } from 'actions';
import { IRootState, IPageState } from 'reducers';
import { Store, Dispatch } from 'redux';
import { IUseList } from 'hocs';

export const makeUseList = <T extends object>(selectState: (state: IRootState) => IPageState<T>, actions: IActionSet<T>) => (reduxStore?: Store): IUseList<T> => {
  let articles:Array<T> = [];
  let currentPage = 0;
  let totalPages = 0;
  let dispatch: Dispatch<any>;
  if (!reduxStore) {
    articles = useSelector((state: IRootState) => selectState(state).list);
    currentPage = useSelector((state: IRootState) => selectState(state).currentPage);
    totalPages = useSelector((state: IRootState) => selectState(state).totalPages);
    dispatch = useDispatch();
  } else {
    dispatch = reduxStore.dispatch;
  }
  
  const incrementCurrentPage = () => dispatch(actions.incrementCurrentPage());
  const setList = (newArticles: Array<T>) => dispatch(actions.setList(newArticles));
  const addList = (newArticles: Array<T>) => dispatch(actions.addList(newArticles));
  const setTotalPages = (totalPages: number) => dispatch(actions.setTotalPages(totalPages));
  return { articles, currentPage, totalPages, incrementCurrentPage, setList, addList, setTotalPages };
};
