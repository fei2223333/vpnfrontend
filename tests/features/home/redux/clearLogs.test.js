import {
  HOME_CLEAR_LOGS,
} from '../../../../src/features/home/redux/constants';

import {
  clearLogs,
  reducer,
} from '../../../../src/features/home/redux/clearLogs';

describe('home/redux/clearLogs', () => {
  it('returns correct action by clearLogs', () => {
    expect(clearLogs()).toHaveProperty('type', HOME_CLEAR_LOGS);
  });

  it('handles action type HOME_CLEAR_LOGS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_CLEAR_LOGS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
