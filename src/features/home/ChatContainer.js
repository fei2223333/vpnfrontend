import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import styled from 'styled-components';
import Measure from 'react-measure';
import {List, Control} from './';
import {Button} from 'antd';

const config = {
  background: '#eceff1',
  input: '#fff',
  placeholder: '#bbb',
  iconColor: '#000',
  iconSendColor: '#218380',
  iconHoverColor: '#285943',
  chatHeight: 500,
  inputMaxHeight: 80
};

const Chat = styled.div`
  background-color: ${config.background};
	position: relative;
	height: ${config.chatHeight}px;

  * {
    box-sizing: border-box;
  }
`;

export default function ChatContainer(props){
  const [controlsSize, setControlsSize] = useState(config.controlsSize);
  

  const addMessage = (text, position, color) => {
    // updateMessages({text, position});
    // this.setState({messages});
  }

  const resizeControl = (size) => {
    setControlsSize(size.client.height);
  }

    return (
      <Chat>
        <List messages={props.messages} controlsSize={controlsSize} />
        <Measure client onResize={resizeControl}>
          {({ measureRef }) => (
            <Control innerRef={measureRef} add={addMessage} />
          )}
        </Measure>
      </Chat>
    );
}

ChatContainer.propTypes = {};
ChatContainer.defaultProps = {};
