import {View, Text, Pressable, Switch} from 'react-native';
import tw from 'twrnc';
import {BodyStyle, Hstyle} from '../Style';
import auth from '@react-native-firebase/auth';
import {SettingsBtns} from './SettingsBtns';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useSelector} from 'react-redux';
import {RootState} from '../Store';
import React from 'react';
import {
  InformationCircleIcon,
  MoonIcon,
  PowerIcon,
  UserCircleIcon,
} from 'react-native-heroicons/outline';

export const AccountSettings = () => {
  const user = useSelector((state: RootState) => state.info.user);

  const signOutFirebase = () => {
    auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        EncryptedStorage.removeItem('email');
        EncryptedStorage.removeItem('password');
      })
      .catch(error => {
        // An error happened.
        console.log('error', error);
      });
  };
  const settingsArray = [
    {
      screen: 'ProfilPage',
      title: 'Profil',
      icon: <UserCircleIcon size={50} color="black" />,
    },
    {
      screen: 'ProfilPage',
      title: 'Aide',
      icon: <InformationCircleIcon size={50} color="black" />,
    },
    {
      screen: 'Home',
      title: 'Se déconnecter',
      onPress: signOutFirebase,
      icon: <PowerIcon size={50} color="black" />,
    },
  ];

  return (
    <View style={tw.style(BodyStyle, `px-4`)}>
      <Text style={tw.style(Hstyle, `self-center mb-20`)}>{user?.name}</Text>
      <View style={tw`flex gap-10`}>
        {settingsArray.map((value, i) => (
          <SettingsBtns
            key={i}
            navigateTo={value.screen}
            icon={value.icon}
            title={value.title}
            onPress={value.onPress}
          />
        ))}
        <View style={tw`flex flex-row justify-between rounded-lg px-2 py-1`}>
          <View style={tw`flex flex-row gap-2`}>
            <MoonIcon size={50} color="black" />
            <Text style={tw`text-lg text-black self-center`}>Dark mode</Text>
          </View>
          <Switch
            trackColor={{false: '#767577', true: '#2563eb'}}
            // onValueChange={value => {
            //   setFieldValue('isActive', value);
            // }}
            // value={values.isActive}
          />
        </View>
      </View>
    </View>
  );
};
