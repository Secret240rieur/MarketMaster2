import {createStackNavigator} from '@react-navigation/stack';
import {TabNavigator} from './TabNavigator';
import {LoginPage} from './Account/LoginPage';
import {SignupPage} from './Account/SignupPage';
import {AccountSettings} from './Account/AccountSettings';
import {ProfilPage} from './Account/ProfilPage';
import {CityScreen} from './Publish/CityScreen';
import {AdPage} from './Annonce/AdPage';
import {ChatPage} from './Chat/ChatPage';
import {useSelector} from 'react-redux';
import {RootState} from './Store';
import {EditAd} from './Annonce/EditAd';
import {CategoriesScreen} from './Publish/CategoriesScreen';
import {AccountPage} from './Account/AccountPage';
import {ChangePassword} from './Account/ChangePassword';
import React from 'react';

const Stack = createStackNavigator();

export const NavigationStack = () => {
  const uid = useSelector((state: RootState) => state.info.uid);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="SignupPage" component={SignupPage} />
      <Stack.Screen name="AccountSettings" component={AccountSettings} />
      <Stack.Screen name="ProfilPage" component={ProfilPage} />
      <Stack.Screen name="Cities" component={CityScreen} />
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="AdPage" component={AdPage} />
      <Stack.Screen name="EditAd" component={EditAd} />
      <Stack.Screen name="AccountPage" component={AccountPage} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="ChatPage" component={uid ? ChatPage : LoginPage} />
    </Stack.Navigator>
  );
};
