import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Login from './pages/Login';
import Deliveries from './pages/Deliveries';
import Profile from './pages/Profile';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export default function createRouter(isSigned = false) {
  return !isSigned ? (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions={{
          activeTintColor: '#7D40E7',
          inactiveTintColor: '#999999',
          labelStyle: {
            fontSize: 14,
          },
          tabStyle: {
            paddingVertical: 6,
          },
          style: {
            backgroundColor: '#fff',
            height: 60,
          },
          keyboardHidesTabBar: true,
        }}
      >
        <Tabs.Screen
          name="Deliveries"
          component={Deliveries}
          options={{
            tabBarLabel: 'Entregas',
            tabBarIcon: ({ color }) => (
              <Icon name="reorder" size={26} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Perfil"
          component={Profile}
          options={{
            tabBarLabel: 'Meu Perfil',
            tabBarIcon: ({ color }) => (
              <Icon name="account-circle" size={26} color={color} />
            ),
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}
