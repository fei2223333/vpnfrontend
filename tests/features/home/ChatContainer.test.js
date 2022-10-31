import React from 'react';
import { shallow } from 'enzyme';
import { ChatContainer } from '../../../src/features/home/ChatContainer';

describe('home/ChatContainer', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ChatContainer {...props} />
    );

    expect(
      renderedComponent.find('.home-chat-container').length
    ).toBe(1);
  });
});
