import React, { Component, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import styled from 'styled-components';
import {Button, message} from 'antd';
import {SocketContext} from './context/socket.js';
import {useUpdateMessages} from './redux/hooks';
import {useUpdateLogs} from './redux/hooks';
import CryptoJS from 'crypto-js';
import { useSelector } from 'react-redux';

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

const Container = styled.div`
  padding: 5px;
  position: absolute;
  bottom: 0;
  width: 100%;
  transition: all 0.5s ease;

  i.fa {
    font-size: 1.8em;
  }

  a {
    color: ${config.iconColor};
    margin-left: 2px;
    margin-top: 5px;
    width: 28px;
    display: inline-block;
  }

  a:hover {
		color: ${config.iconHoverColor};
	}
`;

const RightPanel = styled.div`
  .text {
		position: relative;
		float: left;
		width: 93%;
    text-align: left;
	}

  .text:after {
    content: ' ';
    position: absolute;
    width: 0;
    height: 0;
    left: auto;
    right: -11px;
    top: 0;
    bottom: auto;
    border-width: 7px;
    border-style: solid;
    border-color: ${config.input} transparent transparent ${config.input};
  }
  
  .action {
    float: left;
    width: 7%;
    text-align: center;
  }
  
  .input {
    font-size: 14px;
    padding: 7px;
    background-color: ${config.input};
    max-height: ${config.inputMaxHeight}px;
    overflow: auto;
    box-shadow: 0 2px 3px 2px rgba(0, 0, 0, 0.09);
    border-radius: 4px;

    div {
      min-height: 20px;
      word-wrap: break-word;
      white-space: pre-wrap;
      overflow-x: hidden;
      outline: none;
    }

    .placeholder {
      color: ${config.placeholder};
      z-index: 0;
      position: absolute;
      pointer-events: none;
      user-select: none;    
    }
  }
`;

export default function Control(props){
  const {updateMessages} = useUpdateMessages();
  const [placeholder, setPlaceholder] = useState(true);
  const socket = useContext(SocketContext);
  // const {updateMessages} = useUpdateMessages()['updateMessages'];
  const updateLogs = useUpdateLogs()['updateLogs'];
  const innerRef = props.innerRef;
  const add = props.add;
  const { clientOrServer} = useSelector(state => ({
    clientOrServer: state.home.clientOrServer,
  }));

  useEffect(()=>{
    socket.on("receiveMessage",(arg)=>{
      const EK = localStorage.getItem("EK");
      const MK = localStorage.getItem("MK");
      const {encryptedM, hmacEncryptedM, } = arg
      var decryptedM = CryptoJS.AES.decrypt(encryptedM, EK).toString(CryptoJS.enc.Utf8);
      updateLogs(`Decrypted message: ${decryptedM}`);
      const rehmacEncryptedM = CryptoJS.HmacSHA256(encryptedM, MK).toString();
      updateLogs(`Integrity check : ${hmacEncryptedM === rehmacEncryptedM?"Passed":"NOT passed"}`)
      if(hmacEncryptedM !== rehmacEncryptedM) {
        message.error('Message Integrity check failed! Dont trust the message');
      }else{
        updateMessages({text:decryptedM, position:'left'});
      }
    })
  },[socket, updateMessages, updateLogs]);

  const encodeHTML=(s)=> {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

  const submit = () => {
    updateLogs(`Sanitizing user input...`);
    const message = encodeHTML(innerRef.input.innerText);
    const EK = localStorage.getItem("EK");
    const MK = localStorage.getItem("MK")
    if(!message || !localStorage.getItem("sessionKey") || !EK || !MK) return;
    
    const encryptedM = CryptoJS.AES.encrypt(message, EK).toString();
    // const decryptTest = CryptoJS.AES.decrypt(encryptedM, EK).toString(CryptoJS.enc.Utf8);


    updateLogs(`Using AES with EK as key to encrypt message :EncEk(M) = ${encryptedM}`);
    const hmacEncryptedM = CryptoJS.HmacSHA256(encryptedM, MK).toString();
    updateLogs(`HMAC(Encek(M),MK) = ${hmacEncryptedM}`);
    
    
    socket.emit('sendMessage', {encryptedM, hmacEncryptedM, state: clientOrServer});
    updateMessages({text:message, position:'right'});
    innerRef.input.innerText = '';
  }

  const teste = (e) => {
    const value = e.target.innerText;
    if (value === '') {
      setPlaceholder(true);
    } else {
      setPlaceholder(false);
    }
  }

    return (
      <Container>
        <RightPanel>
          <div className="text">
            <div className="input" ref={innerRef}>
              {placeholder && 
                <span className="placeholder">
                  Type your message
                </span>
              }
              <div id="textarea" contentEditable="true"
                onInput={teste} ref={(el) => { innerRef.input = el }}>
              </div>
            </div>
          </div>
          <div className="action">
            <a href="#" onClick={submit}>
              <Button>Send</Button>
            </a>
          </div>
        </RightPanel>
      </Container>
      
    )
}

Control.propTypes = {};
Control.defaultProps = {};
