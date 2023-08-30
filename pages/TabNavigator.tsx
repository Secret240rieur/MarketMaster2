import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {LoginPage} from './Account/LoginPage';
import {PublishStack} from './Publish/PublishStack';
import {AccountPage} from './Account/AccountPage';
import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import {ConversationsListPage} from './Chat/ConversationsListPage';
import {AnnoncesPage} from './Annonce/AnnoncesPage';
import {useDispatch} from 'react-redux';
import {setUid} from './InfoSlice';
import {getValueFor} from '../SecureStore';
import {Signin} from './Account/Signin';
import React from 'react';
import {
  HomeIcon as HomeIconOutline,
  HeartIcon as HeartIconOutline,
  CameraIcon as CameraIconOutline,
  ChatBubbleLeftRightIcon as ChatBubbleLeftRightIconOutline,
  UserIcon as UserIconOutline,
} from 'react-native-heroicons/outline';
import {
  HomeIcon as HomeIconSolid,
  HeartIcon as HeartIconSolid,
  CameraIcon as CameraIconSolid,
  ChatBubbleLeftRightIcon as ChatBubbleLeftRightIconSolid,
  UserIcon as UserIconSolid,
} from 'react-native-heroicons/solid';

export const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const [connected, setConnected] = useState(false);
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [secureStore, setSecureStore] = useState(false);

  useEffect(() => {
    const getCredentials = async () => {
      setEmail(await getValueFor('email'));
      setPassword(await getValueFor('password'));

      if (email && password) {
        setSecureStore(true);
      } else {
        setSecureStore(false);
      }
    };

    getCredentials();
  });

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // console.log("logged in");
        setConnected(true);
      } else if (secureStore) {
        Signin();
        setConnected(true);
      } else {
        // User is signed out
        // ...
        // console.log("not logged in");
        setConnected(false);
      }
      dispatch(setUid(user?.uid));
    });
    return subscriber;
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconComponent;
          if (route.name === 'Home') {
            iconComponent = focused ? (
              <HomeIconSolid size={size} color={color} />
            ) : (
              <HomeIconOutline size={size} color={color} />
            );
            return iconComponent;
          } else if (route.name === 'Favoris') {
            iconComponent = focused ? (
              <HeartIconSolid size={size} color={color} />
            ) : (
              <HeartIconOutline size={size} color={color} />
            );
            return iconComponent;
          } else if (route.name === 'Vendre') {
            iconComponent = focused ? (
              <CameraIconSolid size={size} color={color} />
            ) : (
              <CameraIconOutline size={size} color={color} />
            );
            return iconComponent;
          } else if (route.name === 'Chat') {
            iconComponent = focused ? (
              <ChatBubbleLeftRightIconSolid size={size} color={color} />
            ) : (
              <ChatBubbleLeftRightIconOutline size={size} color={color} />
            );
            return iconComponent;
          } else if (route.name === 'Compte') {
            iconComponent = focused ? (
              <UserIconSolid size={size} color={color} />
            ) : (
              <UserIconOutline size={size} color={color} />
            );
            return iconComponent;
          }
        },
        tabBarActiveTintColor: 'gray',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen
        name="Home"
        component={AnnoncesPage}
        options={{title: 'Home'}}
      />
      {/* <Tab.Screen
        name="Favoris"
        component={Favoris}
        options={{ title: "Favoris" }}
      /> */}
      {
        <Tab.Screen
          name="Vendre"
          component={connected ? PublishStack : LoginPage}
          options={{
            title: 'Vendre',
            tabBarStyle: !connected ? {display: 'none'} : {display: 'flex'},
          }}
        />
      }
      <Tab.Screen
        name="Chat"
        component={connected ? ConversationsListPage : LoginPage}
        options={{
          title: 'Chat',
          tabBarStyle: !connected ? {display: 'none'} : {display: 'flex'},
        }}
      />
      <Tab.Screen
        name="Compte"
        component={connected ? AccountPage : LoginPage}
        options={{
          title: 'Compte',
          tabBarStyle: !connected ? {display: 'none'} : {display: 'flex'},
        }}
      />
      {/* <Tab.Screen
        name="Compte"
        component={AccountSettings}
        options={{ title: "Compte" }}
      /> */}
    </Tab.Navigator>
  );
};
