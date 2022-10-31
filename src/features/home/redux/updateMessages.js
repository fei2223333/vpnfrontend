import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  HOME_UPDATE_MESSAGES,
} from './constants';

export function updateMessages({text, position}) {
  return {
    type: HOME_UPDATE_MESSAGES,
    data: {
      text,
      position,
      color: (position==="right"?"#FFD54F":null),
    }
  };
}

export function useUpdateMessages() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(updateMessages(...params)), [dispatch]);
  return { updateMessages: boundAction };
}

export function reducer(state, action) {
  const copy = [...state.messages];
  copy.push(action.data);
  switch (action.type) {
    case HOME_UPDATE_MESSAGES:
      return {
        ...state,
        messages: copy,
      };

    default:
      return state;
  }
}
