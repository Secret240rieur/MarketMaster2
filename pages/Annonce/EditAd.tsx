import {
  ScrollView,
  View,
  Text,
  Pressable,
  TextInput,
  Switch,
} from 'react-native';
import tw from 'twrnc';
import {BodyStyle, Hstyle} from '../Style';
import {ErrorMessage, Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {UpdateAd} from './UpdateAd';
import {Selectable} from '../Publish/Selectable';
import {ImageField} from '../Publish/ImageField';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../Store';
import {reset} from '../InfoSlice';
import {ContinueButton} from './ContinueButton';
import React from 'react';
import {FlagIcon, FunnelIcon, XMarkIcon} from 'react-native-heroicons/outline';

export const EditAd = ({route}: any) => {
  const categoryTmp = useSelector((state: RootState) => state.info.category);
  const cityTmp = useSelector((state: RootState) => state.info.city);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('title is required'),
    price: Yup.number().required('price should be greater than 0'),
    description: Yup.string().required('Description is required'),
    isEmpty: Yup.boolean().test(
      'is-false',
      'you need at least one image ',
      value => value === false,
    ),
  });

  const deleted = route.params.ad.deleted;
  const isActive = route.params.ad.isActive;
  const id = route.params.ad.id;
  const title = route.params.ad.title;
  const price = route.params.ad.price;
  const description = route.params.ad.description;
  const category =
    categoryTmp === 'Toutes les categories'
      ? route.params.ad.category
      : categoryTmp;
  const city = cityTmp === 'Tout le Maroc' ? route.params.ad.city : cityTmp;
  const images = route.params.ad.imagesUrl;

  const navigation = useNavigation<any>();
  const navigate = {
    name: 'AdPage',
    params: {
      id,
    },
  };

  return (
    <Formik
      initialValues={{
        title,
        price,
        description,
        images,
        isActive,
        // isEmpty,
      }}
      onSubmit={async values => {
        UpdateAd({
          title: values.title,
          price: values.price,
          description: values.description,
          category,
          city,
          id,
          isActive: values.isActive,
          deleted: false,
        });
        dispatch(reset());
        if (deleted === false) navigation.navigate(navigate);
        else navigation.navigate('AccountPage');
      }}
      validationSchema={validationSchema}>
      {({handleSubmit, isValid, handleChange, setFieldValue, values}) => (
        <View style={tw.style(BodyStyle)}>
          <View style={tw`h-10 relative`}>
            <Pressable
              style={tw`absolute left-4`}
              onPress={() => {
                navigation.navigate(navigate);
              }}>
              <XMarkIcon size={30} color="white" />
            </Pressable>
            <Text
              style={tw.style(
                'absolute self-center text-2xl font-bold text-white mb-6',
              )}>
              Modifier l'annonce
            </Text>
          </View>
          <ScrollView style={tw`p-4 gap-5`}>
            <View style={tw`gap-5`}>
              <View>
                <Text style={tw.style(Hstyle)}>Titre</Text>
                <TextInput
                  onChangeText={handleChange('title')}
                  value={values.title}
                  style={tw`border border-white bg-zinc-500 h-12 rounded p-2`}
                />
                <Text>
                  <ErrorMessage name={'title'} />
                </Text>
              </View>
              <View>
                <Text style={tw.style(Hstyle)}>Price</Text>
                <TextInput
                  onChangeText={handleChange('price')}
                  value={values.price.toString()}
                  style={tw`border border-white bg-zinc-500 h-12 rounded p-2`}
                />
                <Text>
                  <ErrorMessage name={'price'} />
                </Text>
              </View>
              <View>
                <Text style={tw.style(Hstyle)}>Description</Text>
                <TextInput
                  onChangeText={handleChange('description')}
                  value={values.description}
                  multiline
                  style={tw`border border-white bg-zinc-500 h-52 rounded p-2`}
                />
                <Text>
                  <ErrorMessage name={'description'} />
                </Text>
              </View>
              <Selectable
                title={'Catégories'}
                value={category}
                onPress={() => navigation.push('Categories')}
                icon={<FunnelIcon size={30} color="white" />}
              />
              <Selectable
                title={'Ville'}
                value={city}
                onPress={() => navigation.push('Cities')}
                icon={<FlagIcon size={30} color="white" />}
              />
              <View>
                <Text style={tw.style(Hstyle)}>Photos (8 maximum)</Text>
                <Text style={tw`text-sm text-gray-400`}>
                  Touch image to delete
                </Text>
              </View>
              <ImageField
                id={id}
                adImages={images}
                setIsEmpty={value => {
                  setFieldValue('isEmpty', value);
                }}
              />
              <ErrorMessage name={'isEmpty'} />

              <View style={tw`flex flex-row justify-between mb-10`}>
                <Text style={tw.style(Hstyle)}>Statut</Text>
                <Switch
                  trackColor={{false: '#767577', true: 'black'}}
                  // thumbColor={isActive ? 'black' : 'black'}
                  onValueChange={value => {
                    setFieldValue('isActive', value);
                  }}
                  value={values.isActive}
                />
              </View>
            </View>
          </ScrollView>
          <ContinueButton
            handleSubmit={handleSubmit}
            isValid={isValid}
            text={deleted ? 'Recover' : 'Continue'}
          />
        </View>
      )}
    </Formik>
  );
};
