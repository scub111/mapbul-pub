import { useSelector, useDispatch } from 'react-redux';
import { IActionSet } from 'actions';
import { IRootState, IPageState } from 'reducers';
import { Store, Dispatch } from 'redux';
import { IUseList } from 'hocs';

export const makeUseList = <T extends object>(
  selectState: (state: IRootState) => IPageState<T>,
  actions: IActionSet<T>,
) => (reduxStore?: Store): IUseList<T> => {
  let list: Array<T> = [];
  let currentPage = 0;
  let totalPages = 0;
  let loading = false;
  let dispatch: Dispatch<any>;
  if (!reduxStore) {
    list = useSelector((state: IRootState) => selectState(state).list);
    currentPage = useSelector((state: IRootState) => selectState(state).currentPage);
    totalPages = useSelector((state: IRootState) => selectState(state).totalPages);
    loading = useSelector((state: IRootState) => selectState(state).loading);
    dispatch = useDispatch();
  } else {
    dispatch = reduxStore.dispatch;
  }

  const incrementCurrentPage = () => dispatch(actions.incrementCurrentPage());
  const setList = (newList: Array<T>) => dispatch(actions.setList(newList));
  const addList = (newList: Array<T>) => dispatch(actions.addList(newList));
  const setTotalPages = (totalPages: number) => dispatch(actions.setTotalPages(totalPages));
  const setLoading = (loading: boolean) => dispatch(actions.setLoading(loading));
  return { list, currentPage, totalPages, loading, incrementCurrentPage, setList, addList, setTotalPages, setLoading };
};
