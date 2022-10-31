import React, { useEffect } from 'react';
import {ChatContainer} from './';
import styled from 'styled-components';
import { Timeline,Divider } from 'antd';

const ChatC = styled.div`
  font-family: 'Open sans', 'sans-serif';
  border: 1px solid #ccc;
  width: 80%;
  margin: 0 auto;
`;
// import PropTypes from 'prop-types';

const messages = [
  { text: 'Testing...', position: 'right', color: '#FFD54F'},
  { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ante nulla, rhoncus eget cursus at, porttitor a lacus. Donec a euismod nisi, nec venenatis sapien. In interdum sagittis lectus laoreet fermentum. Aliquam ut scelerisque felis, dictum fringilla urna. Etiam vel vestibulum nibh. In vel lacus eget arcu molestie malesuada in sit amet dui. Nunc posuere molestie sapien, eu bibendum ipsum. Curabitur ullamcorper elit mauris. Cras vitae lectus sem.', position: 'left' },
  { text: 'Testing...', position: 'right', color: '#FFD54F'},
  { text: 'Testing...', position: 'right', color: '#FFD54F' },
  { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ante nulla, rhoncus eget cursus at, porttitor a lacus. Donec a euismod nisi, nec venenatis sapien. In interdum sagittis lectus laoreet fermentum. Aliquam ut scelerisque felis, dictum fringilla urna. Etiam vel vestibulum nibh. In vel lacus eget arcu molestie malesuada in sit amet dui. Nunc posuere molestie sapien, eu bibendum ipsum. Curabitur ullamcorper elit mauris. Cras vitae lectus sem.', position: 'right', color: '#FFD54F' }
];

export default function ServerEntry() {
  return (
    <div className="home-server-entry">
      <ChatC>
        <ChatContainer messages={messages} />
      </ChatC>
      <div>
      <Divider />
      <Timeline pending="Recording..." >
        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
        <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
        <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
      </Timeline>
    </div>
    </div>
  );
};

ServerEntry.propTypes = {};
ServerEntry.defaultProps = {};
