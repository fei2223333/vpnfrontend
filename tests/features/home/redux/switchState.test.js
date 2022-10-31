import {
  HOME_SWITCH_STATE,
} from '../../../../src/features/home/redux/constants';

import {
  switchState,
  reducer,
} from '../../../../src/features/home/redux/switchState';

describe('home/redux/switchState', () => {
  it('returns correct action by switchState', () => {
    expect(switchState()).toHaveProperty('type', HOME_SWITCH_STATE);
  });

  it('handles action type HOME_SWITCH_STATE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_SWITCH_STATE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
