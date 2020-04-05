import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/Login';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={Login} options={{ title: Login }} />
    </Stack.Navigator>
  );
}
