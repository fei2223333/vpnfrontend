import {
  HOME_UPDATE_LOGS,
} from '../../../../src/features/home/redux/constants';

import {
  updateLogs,
  reducer,
} from '../../../../src/features/home/redux/updateLogs';

describe('home/redux/updateLogs', () => {
  it('returns correct action by updateLogs', () => {
    expect(updateLogs()).toHaveProperty('type', HOME_UPDATE_LOGS);
  });

  it('handles action type HOME_UPDATE_LOGS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_UPDATE_LOGS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
