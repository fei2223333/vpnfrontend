import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {Balloon} from './';
import styled from 'styled-components';

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


const Messages = styled.div`
  text-align: left;
  height: ${props => config.chatHeight - props.controlsSize}px;
	padding-left: 14px;
  padding-right: 14px;
  padding-bottom: 20px;
	overflow: auto;
`;

export class List extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView();
  }

  render() {
    return (
      <Messages ref={(el) => {this.container = el}} controlsSize={this.props.controlsSize}>
        {this.props.messages.map((msg, index) => (
          <Balloon key={index} position={msg.position} color={msg.color}>
            {msg.text}
          </Balloon>
        ))}
        <div ref={(el) => { this.messagesEnd = el }} />
      </Messages>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
