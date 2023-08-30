import {createStackNavigator} from '@react-navigation/stack';
import {PublishPost1} from './PublishPost1';
import {CategoriesScreen} from './CategoriesScreen';
import {CityScreen} from './CityScreen';
import {PublishPost2} from './PublishPost2';
import React from 'react';

const Stack = createStackNavigator();

export function PublishStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="PublishPost1" component={PublishPost1} />
      <Stack.Screen name="PublishPost2" component={PublishPost2} />
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="Cities" component={CityScreen} />
    </Stack.Navigator>
  );
}
