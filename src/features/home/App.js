import React from 'react';
import {HomeLayout, ClientEntry, ServerEntry} from './';
import { useSelector } from 'react-redux';
import 'antd/dist/antd.min.css';
import AppContextProviders from './context/index';

export default function App({ children }) {
  const { clientOrServer} = useSelector(state => ({
    clientOrServer: state.home.clientOrServer,
  }));
  return (
    <div className="home-app">
      <div className="page-container">
      <AppContextProviders>
        <HomeLayout children={children}>
          {clientOrServer ==="Client"?<ClientEntry/>:<ClientEntry/>}
        </HomeLayout>
        </AppContextProviders>
      </div>
    </div>
  );
}
