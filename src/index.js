import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import OfflineNotice from './components/OfflineNotice';
import NetInfo from '@react-native-community/netinfo';
import './config/ReactotronConfig';

import Routes from './routes';

const App: () => React$Node = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    NetInfo.fetch().then((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      NetInfo.addEventListener((state) => {
        setIsConnected(state.isConnected);
      });
    };
  }, [NetInfo]);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Routes />
      {isConnected ? [] : <OfflineNotice />}
    </>
  );
};

export default App;
