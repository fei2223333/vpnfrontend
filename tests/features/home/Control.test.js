import React from 'react';
import { shallow } from 'enzyme';
import { Control } from '../../../src/features/home/Control';

describe('home/Control', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Control {...props} />
    );

    expect(
      renderedComponent.find('.home-control').length
    ).toBe(1);
  });
});
