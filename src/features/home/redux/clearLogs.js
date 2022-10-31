import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  HOME_CLEAR_LOGS,
} from './constants';

export function clearLogs() {
  return {
    type: HOME_CLEAR_LOGS,
  };
}

export function useClearLogs() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(clearLogs(...params)), [dispatch]);
  return { clearLogs: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_CLEAR_LOGS:
      return {
        ...state,
        logs:[],
      };

    default:
      return state;
  }
}
