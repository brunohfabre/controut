import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { Tasks } from './src/pages/Tasks';

export default function App(): JSX.Element {
  return (
    <>
      <StatusBar style="light" />
      <Tasks />
    </>
  );
}
