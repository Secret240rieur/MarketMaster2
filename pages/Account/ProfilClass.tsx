import {KeyboardTypeOptions} from 'react-native';
import React from 'react';
import {
  AtSymbolIcon,
  FlagIcon,
  HashtagIcon,
  LockClosedIcon,
  PhoneIcon,
  UserIcon,
} from 'react-native-heroicons/outline';

type Props = {
  icnColor?: string;
  txtColor?: string;
  user?: User;
  isDarkMode?: boolean;
};

export const ProfilClass = ({icnColor, txtColor, user, isDarkMode}: Props) => {
  const profilCreate = [
    {
      name: 'name',
      placeholder: 'Full name',
    },
    {
      name: 'email',
      placeholder: 'Email',
      keyboardType: 'email-address' as KeyboardTypeOptions,
    },
    {
      name: 'emailconf',
      placeholder: 'Confirm email',
      keyboardType: 'email-address' as KeyboardTypeOptions,
    },
    {
      name: 'password',
      placeholder: 'Password',
    },
    {
      name: 'passconf',
      placeholder: 'Confirm password',
    },
    {
      name: 'phone',
      placeholder: 'Phone number',
      KeyboardType: 'numeric' as KeyboardTypeOptions,
    },
  ];

  const profilInfo = [
    {
      name: 'name',
      title: 'Nom et Prénom',
      placeholder: 'Full name',
      icon: <UserIcon size={30} color={icnColor} />,
    },
    {
      name: 'email',
      editable: false,
      title: 'Email',
      icon: <AtSymbolIcon size={30} color={icnColor} />,
      icon2: <LockClosedIcon size={30} color={icnColor} />,
    },
    {
      name: 'phone',
      keyboardType: 'numeric' as KeyboardTypeOptions,
      title: 'Télephone',
      placeholder: '06101010',
      icon: <PhoneIcon size={30} color={icnColor} />,
    },
  ];

  const selectableInfo = [
    {
      icon: <FlagIcon size={20} color={icnColor} />,
      title: 'Ville',
      screen: {
        name: 'Cities',
        params: {
          txtColor,
          icnColor,
        },
      },
    },
    {
      title: 'Mot de passe',
      value: 'Modifier',
      screen: {
        name: 'ChangePassword',
        params: {
          user,
          isDarkMode,
          txtColor,
        },
        icon: <HashtagIcon size={20} color={icnColor} />,
      },
    },
  ];

  return {profilInfo, selectableInfo, profilCreate};
};
