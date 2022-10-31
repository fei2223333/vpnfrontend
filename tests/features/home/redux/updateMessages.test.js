import {
  HOME_UPDATE_MESSAGES,
} from '../../../../src/features/home/redux/constants';

import {
  updateMessages,
  reducer,
} from '../../../../src/features/home/redux/updateMessages';

describe('home/redux/updateMessages', () => {
  it('returns correct action by updateMessages', () => {
    expect(updateMessages()).toHaveProperty('type', HOME_UPDATE_MESSAGES);
  });

  it('handles action type HOME_UPDATE_MESSAGES correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_UPDATE_MESSAGES }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
