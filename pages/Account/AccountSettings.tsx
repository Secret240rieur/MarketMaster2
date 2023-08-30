import {View, Text} from 'react-native';
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
  PowerIcon,
  UserCircleIcon,
} from 'react-native-heroicons/outline';

export const AccountSettings = () => {
  const user = useSelector((state: RootState) => state.info.user);

  // const auth = getAuth();
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

  return (
    <View style={tw.style(BodyStyle, `px-4`)}>
      <Text style={tw.style(Hstyle, `self-center mb-20`)}>{user?.name}</Text>
      <View style={tw`flex gap-10`}>
        <SettingsBtns
          navigateTo="ProfilPage"
          icon={<UserCircleIcon size={50} color="white" />}
          title={'Profil'}
        />

        <SettingsBtns
          navigateTo="ProfilPage"
          icon={<InformationCircleIcon size={50} color="white" />}
          title={'Aide'}
        />

        <SettingsBtns
          navigateTo="Home"
          onPress={signOutFirebase}
          icon={<PowerIcon size={50} color="white" />}
          title={'Se déconnecter'}
        />
      </View>
    </View>
  );
};
