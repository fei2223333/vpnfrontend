import initialState from './initialState';
import { reducer as switchStateReducer } from './switchState';
import { reducer as updateMessagesReducer } from './updateMessages';
import { reducer as updateLogsReducer } from './updateLogs';
import { reducer as clearLogsReducer } from './clearLogs';

const reducers = [
  switchStateReducer,
  updateMessagesReducer,
  updateLogsReducer,
  clearLogsReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
