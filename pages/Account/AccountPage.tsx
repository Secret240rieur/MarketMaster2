import {View, Text, Pressable, ScrollView} from 'react-native';
import tw from 'twrnc';
import {Hstyle} from '../Style';
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
  CogIcon,
  Cog6ToothIcon,
} from 'react-native-heroicons/outline';

export const AccountPage = () => {
  const navigation = useNavigation<any>();
  const user = useSelector((state: RootState) => state.info.user);
  const activeAds = useSelector((state: RootState) => state.info.activeAds);
  const disabledAds = useSelector((state: RootState) => state.info.disabledAds);
  const deletedAds = useSelector((state: RootState) => state.info.deletedAds);
  const [index, setIndex] = useState<number>(0);
  const uid = useSelector((state: RootState) => state.info.uid);
  const dispatch = useDispatch();

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
    <View style={tw`flex-1 bg-zinc-900`}>
      <View style={tw`flex flex-col gap-7 h-55 w-full px-4 bg-zinc-800 pt-15 `}>
        <View style={tw`flex flex-row justify-between items-center`}>
          <Text>
            <UserCircleIcon color="white" size={80} />
          </Text>

          <View style={tw`flex flex-col gap-2`}>
            <Text style={tw.style(Hstyle)}>{user?.name}</Text>
            <View style={tw`flex flex-row gap-2`}>
              <MapPinIcon size={24} color="#9ca3af" />
              <Text style={tw.style(Tstyle)}>{user?.city}</Text>
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
            <Pressable style={tw.style(Pstyle)} onPress={() => setIndex(0)}>
              <Text style={tw.style(style)}>
                Actives ({activeAds ? activeAds.length : 0})
              </Text>
            </Pressable>
            <Pressable style={tw.style(Pstyle)} onPress={() => setIndex(1)}>
              <Text style={tw.style(style)}>Rejected (0)</Text>
            </Pressable>
            <Pressable style={tw.style(Pstyle)} onPress={() => setIndex(2)}>
              <Text style={tw.style(style)}>
                Desactivées ({disabledAds ? disabledAds.length : 0})
              </Text>
            </Pressable>
            <Pressable style={tw.style(Pstyle)} onPress={() => setIndex(3)}>
              <Text style={tw.style(style)}>
                Supprimées ({deletedAds ? deletedAds.length : 0})
              </Text>
            </Pressable>
            <Pressable style={tw.style(Pstyle)} onPress={() => setIndex(4)}>
              <Text style={tw.style(style)}>Paiement en attente (0)</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
      {AdsInfoSwitch(index)}
    </View>
  );
};

const style = `text-xl font-bold text-white`;
const Pstyle = `bg-blue-600  rounded-3xl items-center justify-center px-4 h-10`;
