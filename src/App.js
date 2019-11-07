import React from 'react';
import { StatusBar } from 'react-native';

import { Routes } from './routes';

export function App() {
  return (
    <>
      <StatusBar backgroundColor='#7159C1' barStyle='light-content' />
      <Routes />
    </>
  );
}
