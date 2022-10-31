import React from 'react';
import { shallow } from 'enzyme';
import { ClientEntry } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ClientEntry />);
  expect(renderedComponent.find('.home-client-entry').length).toBe(1);
});
