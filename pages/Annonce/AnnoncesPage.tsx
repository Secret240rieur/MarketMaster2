import {useCallback, useEffect, useState} from 'react';
import {
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import tw from 'twrnc';
import {AdView} from './AdView';
import {BgNumColor, Hstyle, IcnColor, Tstyle, TxtColor} from '../Style';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../Store';
import {setUser} from '../InfoSlice';
import {FilterBottomSheet} from './FilterBottomSheet';
import firestore from '@react-native-firebase/firestore';
import React from 'react';
import {GlobalScreenContainer} from '../GlobalScreenContainer';

export const AnnoncesPage = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);
  const [searching, setSearching] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const uid = useSelector((state: RootState) => state.info.uid);
  const category = useSelector((state: RootState) => state.info.categoryFilter);
  const city = useSelector((state: RootState) => state.info.cityFilter);
  const isDarkMode = useSelector((state: RootState) => state.info.isDarkMode);
  const txtColor = TxtColor(isDarkMode);
  const icnColor = IcnColor(isDarkMode);
  const bgNumColor = BgNumColor(isDarkMode);
  const dispatch = useDispatch();
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [refreshing]);

  useEffect(() => {
    const loadAds = async () => {
      let tmp: Ad[] = [];
      const postRef = firestore().collection('posts');
      let tmp1;
      let q;
      if (searchText !== '') {
        if (category !== 'Toutes les categories' && city !== 'Tout le Maroc') {
          q = postRef
            .where('title', '>=', searchText)
            .where('title', '<=', searchText + '\uf8ff')
            .where('category', '==', category)
            .where('city', '==', city)
            .where('deleted', '==', false)
            .where('isActive', '==', true);
        } else if (
          category !== 'Toutes les categories' &&
          city === 'Tout le Maroc'
        ) {
          q = postRef
            .where('title', '>=', searchText)
            .where('title', '<=', searchText + '\uf8ff')
            .where('category', '==', category)
            .where('deleted', '==', false)
            .where('isActive', '==', true);
        } else if (
          category === 'Toutes les categories' &&
          city !== 'Tout le Maroc'
        ) {
          q = postRef
            .where('title', '>=', searchText)
            .where('title', '<=', searchText + '\uf8ff')
            .where('city', '==', city)
            .where('deleted', '==', false)
            .where('isActive', '==', true);
        } else if (
          category === 'Toutes les categories' &&
          city === 'Tout le Maroc'
        ) {
          q = postRef
            .where('title', '>=', searchText)
            .where('title', '<=', searchText + '\uf8ff')
            .where('deleted', '==', false)
            .where('isActive', '==', true);
        }

        tmp1 = await q?.get();
        setSearching(false);
      } else {
        if (category !== 'Toutes les categories' && city !== 'Tout le Maroc') {
          q = postRef
            .where('category', '==', category)
            .where('city', '==', city)
            .where('deleted', '==', false)
            .where('isActive', '==', true);
        } else if (
          category !== 'Toutes les categories' &&
          city === 'Tout le Maroc'
        ) {
          q = postRef
            .where('category', '==', category)
            .where('deleted', '==', false)
            .where('isActive', '==', true);
        } else if (
          category === 'Toutes les categories' &&
          city !== 'Tout le Maroc'
        ) {
          q = postRef
            .where('city', '==', city)
            .where('deleted', '==', false)
            .where('isActive', '==', true);
        } else if (
          category === 'Toutes les categories' &&
          city === 'Tout le Maroc'
        ) {
          q = postRef
            .where('deleted', '==', false)
            .where('isActive', '==', true);
        }
        tmp1 = await q?.get();
      }

      tmp1?.forEach(doc => {
        tmp.push(doc.data() as Ad);
      });
      setAds(tmp);
    };
    loadAds();
  }, [refreshing, searching, category, city, searchText]);

  useEffect(() => {
    const loadUser = async () => {
      if (uid) {
        const userRef = firestore().collection('accounts').doc(uid);
        const userSnap = await userRef.get();
        dispatch(setUser(userSnap.data() as User));
      }
    };
    loadUser();
  }, [uid]);

  return (
    <GlobalScreenContainer>
      <SafeAreaView style={tw.style('w-full h-full pb-10')}>
        <ScrollView
          style={tw`flex-1 px-3 pt-10`}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={tw.style('flex flex-row mb-5')}>
            <View
              style={tw.style(
                'border border-zinc-600 border-2 pl-3  w-3/4 h-15',
              )}>
              <TextInput
                placeholder="Tapez pour rechercher"
                placeholderTextColor={'darkgray'}
                value={searchText}
                onChangeText={setSearchText}
                onSubmitEditing={() => setSearching(true)}
                style={tw.style('text-xl text-white ')}
              />
            </View>
            <Pressable
              style={tw.style('m-4')}
              onPress={() => {
                setOpen(true);
              }}>
              <Text style={tw.style('text-2xl font-bold', txtColor)}>
                Filters
              </Text>
            </Pressable>
          </View>

          <Text style={tw.style(Hstyle, txtColor)}>Toutes les catégories</Text>
          <Text style={tw.style(Tstyle, txtColor)}>
            {ads.length} annonces, Toutes les régions
          </Text>
          <View style={tw.style('gap-6 h-full mb-10')}>
            {ads && ads.length > 0 && (
              <AdView
                fullWidth
                id={ads[0].id}
                image={ads[0].imagesUrl[0]}
                title={ads[0].title}
                price={ads[0].price}
              />
            )}
            {ads && ads.length > 0 && (
              <View style={tw.style('flex flex-row flex-wrap gap-3')}>
                {ads.map((value, i) => (
                  <AdView
                    key={i}
                    id={value.id}
                    image={value.imagesUrl[0]}
                    title={value.title}
                    price={value.price}
                  />
                ))}
              </View>
            )}
          </View>
        </ScrollView>
        <FilterBottomSheet
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          icnColor={icnColor}
          txtColor={txtColor}
          bgNumColor={bgNumColor}
        />
      </SafeAreaView>
    </GlobalScreenContainer>
  );
};
