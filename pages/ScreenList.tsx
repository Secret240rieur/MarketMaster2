import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {LoginPage} from './Account/LoginPage';
import {PublishStack} from './Publish/PublishStack';
import {AccountPage} from './Account/AccountPage';
import {ConversationsListPage} from './Chat/ConversationsListPage';
import {AnnoncesPage} from './Annonce/AnnoncesPage';

export const ScreenList = ({
  connected,
  bgColor,
}: {
  connected: boolean;
  bgColor: string;
}) => {
  const screen = [
    {
      name: 'Home',
      component: AnnoncesPage,
      options: {title: 'Home'},
    },
    {
      name: 'Vendre',
      component: connected ? PublishStack : LoginPage,
      options: {
        title: 'Vendre',
        tabBarStyle: !connected
          ? {display: 'none'}
          : {display: 'flex', backgroundColor: bgColor},
      } as BottomTabNavigationOptions,
    },
    {
      name: 'Chat',
      component: connected ? ConversationsListPage : LoginPage,
      options: {
        title: 'Chat',
        tabBarStyle: !connected
          ? {display: 'none'}
          : {display: 'flex', backgroundColor: bgColor},
      } as BottomTabNavigationOptions,
    },
    {
      name: 'Compte',
      component: connected ? AccountPage : LoginPage,
      options: {
        title: 'Compte',
        tabBarStyle: !connected
          ? {display: 'none'}
          : {display: 'flex', backgroundColor: bgColor},
      } as BottomTabNavigationOptions,
    },
  ];
  return screen;
};
