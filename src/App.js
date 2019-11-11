import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import { Routes } from './routes';

export function App() {
  useEffect(() => {
    changeNavigationBarColor('#FFFFFF', true);
  }, []);

  return (
    <>
      <StatusBar backgroundColor='#7159C1' barStyle='light-content' />
      <Routes />
    </>
  );
}
