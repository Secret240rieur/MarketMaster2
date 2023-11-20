import {Pressable, ScrollView, Text, View} from 'react-native';
import tw from 'twrnc';
import {
  BodyStyle,
  BrdColor,
  Hstyle,
  IcnColor,
  Tstyle,
  TxtColor,
} from '../Style';
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
import {
  FlagIcon,
  FunnelIcon,
  InformationCircleIcon,
  XMarkIcon,
} from 'react-native-heroicons/outline';
import {GlobalScreenContainer} from '../GlobalScreenContainer';

export const PublishPost1 = () => {
  const category = useSelector((state: RootState) => state.info.category);
  const city = useSelector((state: RootState) => state.info.city);
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const [id, setId] = useState<string>('');
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const isDarkMode = useSelector((state: RootState) => state.info.isDarkMode);
  const brdColor = BrdColor(isDarkMode);
  const txtColor = TxtColor(isDarkMode);
  const icnColor = IcnColor(isDarkMode);
  useEffect(() => {
    (async () => {
      const UUID = uuid.v4().toString().toUpperCase();
      console.log(UUID);
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
    <GlobalScreenContainer>
      <View style={tw.style(BodyStyle)}>
        <View style={tw`h-10 relative`}>
          <Pressable
            style={tw`absolute left-4`}
            onPress={() => {
              dispatch(reset());
              navigation.navigate('Home');
              removeImagesFolder(id);
            }}>
            <XMarkIcon size={30} color={icnColor} />
          </Pressable>
          <Text
            style={tw.style(
              `absolute self-center text-2xl font-bold mb-6`,
              txtColor,
            )}>
            Créer une annonce
          </Text>
        </View>
        <ScrollView style={tw`p-4`}>
          <Selectable
            title={'Catégories'}
            value={category}
            onPress={() =>
              navigation.navigate({
                name: 'Categories',
                params: {
                  txtColor,
                  icnColor,
                },
              })
            }
            icon={<FunnelIcon size={30} color={icnColor} />}
            icnColor={icnColor}
            txtColor={txtColor}
          />
          <Selectable
            title={'Ville'}
            value={city}
            onPress={() =>
              navigation.navigate({
                name: 'Cities',
                params: {
                  txtColor,
                  icnColor,
                },
              })
            }
            icon={<FlagIcon size={30} color={icnColor} />}
            icnColor={icnColor}
            txtColor={txtColor}
          />
          <Text style={tw.style(Hstyle, txtColor, `mt-6`)}>
            Photos (8 maximum)
          </Text>

          <ImageField id={id} setIsEmpty={setIsEmpty} />
          <View style={tw`flex flex-row gap-1 justify-center px-3`}>
            <InformationCircleIcon size={24} color="#9ca3af" style={tw`mt-1`} />
            <Text style={tw.style(Tstyle, txtColor, `text-center`)}>
              Une annonce avec photos est consultée 10 fois plus qu‘une annonce
              sans photos
            </Text>
          </View>
        </ScrollView>

        <View style={tw`flex justify-center pt-4`}>
          <Pressable
            disabled={disabled}
            onPress={() => {
              navigation.navigate({
                name: 'PublishPost2',
                params: {
                  id,
                  txtColor,
                  icnColor,
                  brdColor,
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
    </GlobalScreenContainer>
  );
};
