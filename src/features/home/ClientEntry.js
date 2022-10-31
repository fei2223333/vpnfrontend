import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import {ChatContainer} from './';
import styled from 'styled-components';
import { Timeline,Divider } from 'antd';

import {useSelector} from "react-redux";

const ChatC = styled.div`
  font-family: 'Open sans', 'sans-serif';
  border: 1px solid #ccc;
  width: 80%;
  margin: 0 auto;
`;





export default function ClientEntry() {
  
  const { messages, logs } = useSelector(
    state => ({
      messages: state.home.messages,
      logs: state.home.logs,
    })
  );
  return (
    <div className="home-client-entry">
      <ChatC>
        <ChatContainer messages={messages} />
      </ChatC>
      <div>
      <Divider />
      <Timeline pending="Recording..." >
        {logs && logs.map((log, index)=>{
          return <Timeline.Item>{log}</Timeline.Item>
        })}
      </Timeline>
    </div>
    </div>
  );
};

ClientEntry.propTypes = {};
ClientEntry.defaultProps = {};
