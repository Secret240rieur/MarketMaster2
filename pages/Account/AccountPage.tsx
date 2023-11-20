import {View, Text, Pressable, ScrollView} from 'react-native';
import tw from 'twrnc';
import {Hstyle, IcnColor, TxtColor} from '../Style';
import {Tstyle} from '../Style';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../Store';
import {useEffect, useState} from 'react';
import {AdsInfoSwitch} from './AdsInfo/AdsInfoSwitch';
import {setActiveAds, setDeletedAds, setDisabledAds} from '../InfoSlice';
import firestore from '@react-native-firebase/firestore';
import React from 'react';
import {
  UserCircleIcon,
  MapPinIcon,
  Cog6ToothIcon,
} from 'react-native-heroicons/outline';
import {AdsState} from './AdsState';
import {GlobalScreenContainer} from '../GlobalScreenContainer';

export const AccountPage = () => {
  const navigation = useNavigation<any>();
  const user = useSelector((state: RootState) => state.info.user);
  const activeAds = useSelector((state: RootState) => state.info.activeAds);
  const disabledAds = useSelector((state: RootState) => state.info.disabledAds);
  const deletedAds = useSelector((state: RootState) => state.info.deletedAds);
  const [index, setIndex] = useState<number>(0);
  const uid = useSelector((state: RootState) => state.info.uid);
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.info.isDarkMode);
  const txtColor = TxtColor(isDarkMode);
  const icnColor = IcnColor(isDarkMode);
  const adsStates = [
    {name: 'Actives', ads: activeAds},
    // {name: 'Rejected'},
    {name: 'Desactivées', ads: disabledAds},
    {name: 'Supprimées', ads: deletedAds},
    // {name: 'Paiement en attente'},
  ];

  useEffect(() => {
    const loadActiveAds = async () => {
      if (uid) {
        let tmp: Ad[] = [];
        const postRef = firestore().collection('posts');

        const q = postRef
          .where('uid', '==', uid)
          .where('deleted', '==', false)
          .where('isActive', '==', true);

        let tmp1 = await q.get();

        tmp1.forEach(doc => {
          tmp.push(doc.data() as Ad);
        });
        dispatch(setActiveAds(tmp));
      }
    };
    loadActiveAds();
  }, [index]);

  useEffect(() => {
    const loadDeletedAds = async () => {
      if (uid) {
        let tmp: Ad[] = [];
        const postRef = firestore().collection('posts');

        const q = postRef.where('uid', '==', uid).where('deleted', '==', true);
        let tmp1 = await q.get();

        tmp1.forEach(doc => {
          tmp.push(doc.data() as Ad);
        });
        dispatch(setDeletedAds(tmp));
      }
    };
    loadDeletedAds();
  }, [index]);

  useEffect(() => {
    const loadDisabledAds = async () => {
      if (uid) {
        let tmp: Ad[] = [];
        const postRef = firestore().collection('posts');

        const q = postRef
          .where('uid', '==', uid)
          .where('isActive', '==', false)
          .where('deleted', '==', false);

        let tmp1 = await q.get();

        tmp1.forEach(doc => {
          tmp.push(doc.data() as Ad);
        });
        dispatch(setDisabledAds(tmp));
      }
    };
    loadDisabledAds();
  }, [index]);

  return (
    <GlobalScreenContainer>
      <View
        style={tw.style(
          `flex-1 `,
          // , bgColor
        )}>
        <View style={tw.style(`flex flex-col gap-7 h-55 w-full px-4 pt-15 `)}>
          <View style={tw`flex flex-row justify-between items-center`}>
            <Text>
              <UserCircleIcon color="white" size={80} />
            </Text>

            <View style={tw`flex flex-col gap-2`}>
              <Text style={tw.style(Hstyle, txtColor)}>{user?.name}</Text>
              <View style={tw`flex flex-row gap-2`}>
                <MapPinIcon size={24} color="#9ca3af" />
                <Text style={tw.style(Tstyle, txtColor)}>{user?.city}</Text>
              </View>
            </View>
            <Pressable
              style={tw`p-1 border bg-white rounded-full`}
              onPress={() => navigation.navigate('AccountSettings')}>
              <Cog6ToothIcon size={37} color="black" />
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={tw`flex flex-row gap-4 items-center h-10`}>
              {adsStates.map((value, i) => (
                <AdsState
                  key={i}
                  i={i}
                  index={index}
                  setIndex={setIndex}
                  adsStates={value}
                />
              ))}
            </View>
          </ScrollView>
        </View>
        {AdsInfoSwitch(index)}
      </View>
    </GlobalScreenContainer>
  );
};
