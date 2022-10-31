import React from 'react';
import { shallow } from 'enzyme';
import { ServerEntry } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ServerEntry />);
  expect(renderedComponent.find('.home-server-entry').length).toBe(1);
});
