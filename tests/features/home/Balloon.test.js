import React from 'react';
import { shallow } from 'enzyme';
import { Balloon } from '../../../src/features/home/Balloon';

describe('home/Balloon', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Balloon {...props} />
    );

    expect(
      renderedComponent.find('.home-balloon').length
    ).toBe(1);
  });
});
