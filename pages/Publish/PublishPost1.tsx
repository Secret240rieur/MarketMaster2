import {Pressable, ScrollView, Text, View} from 'react-native';
import tw from 'twrnc';
import {BodyStyle, Hstyle, Tstyle} from '../Style';
import {ImageField} from './ImageField';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {RootState} from '../Store';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Selectable} from './Selectable';
import {reset} from '../InfoSlice';
import {removeImagesFolder} from '../../src/Tools';
import uuid from 'react-native-uuid';
import React from 'react';

export const PublishPost1 = () => {
  const category = useSelector((state: RootState) => state.info.category);
  const city = useSelector((state: RootState) => state.info.city);
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const [id, setId] = useState<string>('');
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const UUID = uuid.v4().toString();
      setId(UUID);
    })();
  }, [category === 'Toutes les categories']);

  useFocusEffect(
    useCallback(() => {
      if (
        category !== 'Toutes les categories' &&
        city !== 'Tout le Maroc' &&
        !isEmpty
      ) {
        setDisabled(false);
      } else setDisabled(true);
    }, [category, city, isEmpty]),
  );

  return (
    <View style={tw.style(BodyStyle)}>
      <View style={tw`h-10 relative`}>
        <Pressable
          style={tw`absolute left-4`}
          onPress={() => {
            dispatch(reset());
            navigation.navigate('Home');
            removeImagesFolder(id);
          }}>
          {/* <Entypo name="cross" size={30} color="white" /> */}
        </Pressable>
        <Text
          style={tw`absolute self-center text-2xl font-bold text-white mb-6`}>
          Créer une annonce
        </Text>
      </View>
      <ScrollView style={tw`p-4`}>
        <Selectable
          title={'Catégories'}
          value={category}
          onPress={() => navigation.push('Categories')}
          // icon={<MaterialIcons name="filter-list" size={30} color="white" />}
        />
        <Selectable
          title={'Ville'}
          value={city}
          onPress={() => navigation.push('Cities')}
          // icon={
          //   <MaterialCommunityIcons
          //     name="flag-outline"
          //     size={30}
          //     color="white"
          //   />
          // }
        />
        <Text style={tw.style(Hstyle, `mt-6`)}>Photos (8 maximum)</Text>

        <ImageField id={id} setIsEmpty={setIsEmpty} />
        <View style={tw`flex flex-row gap-1 justify-center`}>
          {/* <Ionicons
            name="md-information-circle-outline"
            size={24}
            color="#9ca3af"
          /> */}
          <Text style={tw.style(Tstyle)}>
            Une annonce avec photos est consultée 10 fois plus qu‘une annonce
            sans photos
          </Text>
        </View>
      </ScrollView>

      <View style={tw`flex justify-center bg-zinc-800 pt-4`}>
        <Pressable
          disabled={disabled}
          onPress={() => {
            navigation.navigate({
              name: 'PublishPost2',
              params: {
                id,
              },
            });
          }}
          style={tw.style(
            `flex border rounded-lg w-[80%] h-12 self-center justify-center bg-zinc-400`,
            {'bg-blue-600': !disabled},
          )}>
          <Text style={tw`flex mx-auto text-xl font-bold text-white`}>
            Continuer
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
