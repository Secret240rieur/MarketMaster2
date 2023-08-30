import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Dimensions,
  RefreshControl,
} from 'react-native';
import tw from 'twrnc';
import {useCallback, useEffect, useState} from 'react';
import {CarouselCardItem} from '../Carousel/carouselCardItem';
import Carousel from 'react-native-reanimated-carousel';
import firestore from '@react-native-firebase/firestore';
import {formatDistance} from 'date-fns';
import {useSelector} from 'react-redux';
import {RootState} from '../Store';
import {ChatButton} from './ChatButton';
import {Contact} from './Contact';
import {EditMode} from './EditMode';
import React from 'react';
import {MapPinIcon} from 'react-native-heroicons/outline';

export const AdPage = ({route}: any) => {
  const [ad, setAd] = useState<Ad>();
  const uid = useSelector((state: RootState) => state.info.uid);
  const [refreshing, setRefreshing] = useState(false);
  // const [editing, setEditing] = useState(false);
  const id = route.params.id ? route.params.id : route.params.aid;

  useEffect(() => {
    if (id) {
      const loadAds = async () => {
        const adRef = firestore().collection('posts').doc(id);
        const adSnap = await adRef.get();
        setAd(adSnap.data() as Ad);
      };
      loadAds();
    }
  }, [refreshing]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [refreshing]);

  return (
    <SafeAreaView style={tw`bg-zinc-800 flex-1`}>
      {ad && (
        <View>
          <ScrollView
            style={tw`h-[90%]`}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <Text style={tw` h-[300px]`}>
              <Carousel
                width={Dimensions.get('window').width}
                data={ad.imagesUrl}
                renderItem={CarouselCardItem}
                height={300}
              />
              ;
            </Text>
            <View style={tw`flex flex-row p-4 justify-between`}>
              <Text style={tw`text-lg w-[60%] font-bold text-white`}>
                {ad.title}
              </Text>
              <Text style={tw`text-lg font-bold text-blue-600 text-right`}>
                {ad.price} DH
              </Text>
            </View>

            <View style={tw`flex flex-row px-4 pb-4 border-b border-white`}>
              <View style={tw`flex flex-row gap-2`}>
                <MapPinIcon size={24} color="#52525b" />
                <Text style={tw`text-lg text-white `}>{ad.city}</Text>
              </View>

              <View style={tw` `}>
                <Text style={tw`text-lg px-4 text-white `}>
                  {formatDistance(
                    new Date(ad?.date.toDate().toISOString()),
                    new Date(),
                    {addSuffix: true},
                  )}
                </Text>
              </View>
            </View>
            <View style={tw`mt-2 `}>
              <Text style={tw`text-xl p-4  font-bold text-white`}>
                Description
              </Text>
              <Text style={tw`text-lg px-4 text-white `}>{ad.description}</Text>
            </View>
          </ScrollView>

          <View
            style={tw`border-t border-zinc-900 bg-neutral-800 h-[10%] justify-center`}>
            <View style={tw`flex-row px-4 justify-between`}>
              <View
                style={tw` justify-center border-r h-12 border-white w-[55%]`}>
                <Text style={tw`text-xl font-bold text-white`}>{ad.user}</Text>
              </View>
              <View style={tw`flex-row gap-1 h-12`}>
                <Contact ad={ad} />
                {ad.uid !== uid && <ChatButton ad={ad} />}
                {ad.uid === uid && <EditMode ad={ad} />}
              </View>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
