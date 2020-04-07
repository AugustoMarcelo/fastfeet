import 'react-native-gesture-handler';
// import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import createRouter from './routes';

export default function App() {
  let signed = false;
  AsyncStorage.getItem('deliveryman').then((response) => {
    if (response !== null) {
      signed = true;
    }
  });

  return createRouter(signed);
}
