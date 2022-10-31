import { useCallback } from 'react';
import { useDispatch } from 'react-redux';


import {
  HOME_SWITCH_STATE,
} from './constants';

export function switchState() {
  return {
    type: HOME_SWITCH_STATE,
  };
}

export function useSwitchState() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(switchState(...params)), [dispatch]);
  return { switchState: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_SWITCH_STATE:
      console.log(state.clientOrServer)
      return {
        ...state,
        clientOrServer: state.clientOrServer === "Client"?"Server":"Client",
      };

    default:
      return state;
  }
}
