import 'react-native-gesture-handler';
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import AsyncStorage from '@react-native-community/async-storage';

import createRouter from './routes';

export default function App() {
  // const signed = await AsyncStorage.getItem('deliveryman');

  return createRouter(true);
}

// export default App;
