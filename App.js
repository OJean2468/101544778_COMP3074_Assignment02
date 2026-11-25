import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainScreen from './screens/MainScreen';
import AboutScreen from './screens/AboutScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerStyle: { backgroundColor: '#2B6CB0' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
          drawerActiveTintColor: '#2B6CB0',
        }}
      >
        <Drawer.Screen
          name="Main"
          component={MainScreen}
          options={{ title: 'Pay Calculator' }}
        />
        <Drawer.Screen
          name="About"
          component={AboutScreen}
          options={{ title: 'About' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}