import {View, Text, Pressable, Switch} from 'react-native';
import tw from 'twrnc';
import {BodyStyle, Hstyle, TxtColor, IcnColor} from '../Style';
import auth from '@react-native-firebase/auth';
import {SettingsBtns} from './SettingsBtns';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../Store';
import React from 'react';
import {
  MoonIcon,
  PowerIcon,
  UserCircleIcon,
} from 'react-native-heroicons/outline';
import {setIsDarkMode} from '../InfoSlice';
import {GlobalScreenContainer} from '../GlobalScreenContainer';

export const AccountSettings = () => {
  const user = useSelector((state: RootState) => state.info.user);
  const isDarkMode = useSelector((state: RootState) => state.info.isDarkMode);
  const dispatch = useDispatch();
  const txtColor = TxtColor(isDarkMode);
  const icnColor = IcnColor(isDarkMode);
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
      icon: <UserCircleIcon size={50} color={icnColor} />,
    },
    // {
    //   screen: 'ProfilPage',
    //   title: 'Aide',
    //   icon: <InformationCircleIcon size={50} color="black" />,
    // },
    {
      screen: 'Home',
      title: 'Se déconnecter',
      onPress: signOutFirebase,
      icon: <PowerIcon size={50} color={icnColor} />,
    },
  ];

  return (
    <GlobalScreenContainer>
      <View style={tw.style(BodyStyle, `px-4`)}>
        <Text style={tw.style(Hstyle, txtColor, `self-center mb-20`)}>
          {user?.name}
        </Text>
        <View style={tw`flex gap-10`}>
          {settingsArray.map((value, i) => (
            <SettingsBtns
              txtColor={txtColor}
              key={i}
              icnColor={icnColor}
              navigateTo={value.screen}
              icon={value.icon}
              title={value.title}
              onPress={value.onPress}
            />
          ))}
          <View style={tw`flex flex-row justify-between rounded-lg px-2 py-1`}>
            <View style={tw`flex flex-row gap-2`}>
              <MoonIcon size={50} color={icnColor} />
              <Text style={tw.style(`text-lg self-center`, txtColor)}>
                Dark mode
              </Text>
            </View>
            <Switch
              trackColor={{false: '#767577', true: 'black'}}
              onValueChange={value => {
                dispatch(setIsDarkMode(value));
              }}
              value={isDarkMode}
            />
          </View>
        </View>
      </View>
    </GlobalScreenContainer>
  );
};
