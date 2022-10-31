import React, { useEffect, useContext } from 'react';
// import PropTypes from 'prop-types';
import { Tag } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import { Switch } from 'antd';
import { useSwitchState, useClearLogs } from './redux/hooks';
import { useSelector } from 'react-redux';
import {SocketContext} from './context/socket.js';
import NodeRSA from 'node-rsa'
import {useUpdateLogs} from './redux/hooks';
import CryptoJS from 'crypto-js';
const { Header, Content, Footer } = Layout;



const HomeLayout = (props) => {
  const socket = useContext(SocketContext);
  const {updateLogs} = useUpdateLogs();
  const {clearLogs} = useClearLogs();
  const {switchState} = useSwitchState();
  const { clientOrServer} = useSelector(state => ({
    clientOrServer: state.home.clientOrServer,
  }));

  const createAsymmetricKey =()=>{
    const key = new NodeRSA({ b: 2048 }); //生成2048位的密钥
    key.setOptions({ encryptionScheme: 'pkcs1' })
    let publicKey = key.exportKey("pkcs1-public-pem");  //公钥
    let privateKey = key.exportKey("pkcs1-private-pem");
    return {publicKey, privateKey, key};
  }

  function sleep(d){  
    var t = Date.now();
    while(Date.now() - t <= d);  
  }

  useEffect(()=>{
    socket.emit('disconnected', ()=>{});
    socket.disconnect(true);
    sleep(1000);
    // socket.emit("clearCurrentSocket",{state:clientOrServer});
    socket.connect();
    // socket.emit("clearCurrentSocket",{state:clientOrServer});
    const {publicKey, privateKey, key} = createAsymmetricKey();
    localStorage.setItem("privateKey", privateKey);
    localStorage.setItem("publicKey", publicKey);
    const localSecret = Math.floor(Math.random() * 20);
    const glocalSecrect = (Math.pow(8,localSecret)%23).toString();
    const signedGlocalSecrect = key.encryptPrivate(glocalSecrect,'base64')
    clearLogs();
    console.log(`------------SET UP STAGE BEGIN-----------`);
    updateLogs(`------------SET UP STAGE BEGIN-----------`)
    console.log(`Generated private key:${privateKey}`);
    updateLogs(`Generated private key:${privateKey}`)
    console.log(`Generated public key:${publicKey}`);
    updateLogs(`Generated public key:${publicKey}`)
    console.log(`Generated local Diffie-Hellman secrect: ${localSecret}`)
    updateLogs(`Generated local Diffie-Hellman secrect: ${localSecret}`)
    console.log(`Generated g^x: ${glocalSecrect}`);
    updateLogs(`Generated g^x: ${glocalSecrect}`)
    console.log(`Sign g^x: ${signedGlocalSecrect}`);
    updateLogs(`Sign g^x: ${signedGlocalSecrect}`)
    socket.emit("clientOrServer", {state:clientOrServer,publicKey, signedGlocalSecrect});
    socket.on("getDiffieHellmanValue",(arg)=>{
      const {publicKey, signedGlocalSecrect} = arg;
      console.log(`get signed Diffie Hellman Value from other side`);
      updateLogs(`get signed Diffie Hellman Value from other side`)
      console.log(`get publicKey from other side: ${publicKey}`);
      updateLogs(`get publicKey from other side: ${publicKey}`)
      const key2 = new NodeRSA(publicKey);
      const dhv = key2.decryptPublic(signedGlocalSecrect,'utf8')
      console.log(`decrypted Diffie Hellman Value from other side: ${dhv}`);
      updateLogs(`decrypted Diffie Hellman Value from other side: ${dhv}`)
      const sessionKey = Math.pow(parseInt(dhv),localSecret)%23;
      console.log(`Generated SessionKey: ${sessionKey}`);
      updateLogs(`Generated SessionKey: ${sessionKey}`)
      localStorage.setItem("sessionKey", sessionKey);
      
      const EK = CryptoJS.SHA3(localStorage.getItem("sessionKey")).toString();
      localStorage.setItem("EK", EK);
      updateLogs(`Calculate EK = Hash(sessionKey) = ${EK}`);
      const MK = CryptoJS.SHA3(EK).toString();
      localStorage.setItem("MK", MK);
      updateLogs(`Calculate MK = Hash(EK) = ${MK}`);
      console.log(`------------SET UP STAGE END-----------`);
    })
    
  }, [clientOrServer, socket, updateLogs, clearLogs])

  const onSwitch = ()=>{
    switchState();
    clearLogs();
  }

  return (<Layout className="layout">
    <Header>
      <div className="logo" />
      <Switch checkedChildren="Client" unCheckedChildren="Server" defaultChecked onChange={onSwitch}/>
      <Tag color="red">Port# {window.location.port}</Tag>
    </Header>
    <Content style={{ margin: '0 16px' }}>
      {props.children}
    </Content>
    <Footer
      style={{
        textAlign: 'center',
      }}
    >
      CPEN 442 Assignment VPN
    </Footer>
  </Layout>)
};

export default HomeLayout;

HomeLayout.propTypes = {};
HomeLayout.defaultProps = {};
