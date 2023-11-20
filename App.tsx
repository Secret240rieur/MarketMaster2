import BottomSheet from '@gorhom/bottom-sheet';
import React, {useMemo, useRef, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import tw from 'twrnc';
import {FilterBottomSheet} from './pages/Annonce/FilterBottomSheet';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './pages/Store';
import {NavigationStack} from './pages/NavigationStack';

export const App = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['94%', '94%'], []);
  const [open, setOpen] = useState<boolean>(false);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <NavigationContainer>
          <NavigationStack />
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
};
