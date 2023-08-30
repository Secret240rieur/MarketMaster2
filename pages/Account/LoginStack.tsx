import {createStackNavigator} from '@react-navigation/stack';
import {LoginPage} from './LoginPage';
import {SignupPage} from './SignupPage';
import {AccountPage} from './AccountPage';
import React from 'react';

const Stack = createStackNavigator();

export function LoginStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AccountPage" component={AccountPage} />
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="SignupPage" component={SignupPage} />
    </Stack.Navigator>
  );
}
