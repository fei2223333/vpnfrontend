import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  HOME_UPDATE_LOGS,
} from './constants';

export function updateLogs(text) {
  return {
    type: HOME_UPDATE_LOGS,
    data: new Date().toLocaleString() + "  "+text,
  };
}

export function useUpdateLogs() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(updateLogs(...params)), [dispatch]);
  return { updateLogs: boundAction };
}

export function reducer(state, action) {
  const copy = [...state.logs];
  copy.push(action.data);
  switch (action.type) {
    

    case HOME_UPDATE_LOGS:
      return {
        ...state,
        logs: copy,
      };

    default:
      return state;
  }
}
