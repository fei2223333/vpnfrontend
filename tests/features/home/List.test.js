import React from 'react';
import { shallow } from 'enzyme';
import { List } from '../../../src/features/home/List';

describe('home/List', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <List {...props} />
    );

    expect(
      renderedComponent.find('.home-list').length
    ).toBe(1);
  });
});
