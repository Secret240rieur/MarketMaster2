import {Pressable, ScrollView, Text, TextInput, View} from 'react-native';
import tw from 'twrnc';
import {BodyStyle, Hstyle} from '../Style';
import {useNavigation} from '@react-navigation/native';
import {ErrorMessage, Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../Store';
import * as Yup from 'yup';
import {reset} from '../InfoSlice';
import firestore from '@react-native-firebase/firestore';
import React from 'react';
import {XMarkIcon} from 'react-native-heroicons/outline';

export const PublishPost2 = ({route}: any) => {
  const category = useSelector((state: RootState) => state.info.category);
  const city = useSelector((state: RootState) => state.info.city);
  const uid = useSelector((state: RootState) => state.info.uid);
  const user = useSelector((state: RootState) => state.info.user?.name);
  const phone = useSelector((state: RootState) => state.info.user?.phone);
  const dispatch = useDispatch();
  const id = route.params.id;
  const navigation = useNavigation<any>();

  console.log(id);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('title is required'),
    price: Yup.number().required('price should be greater than 0'),
    description: Yup.string().required('Description is required'),
  });

  const postUpload = firestore().collection('posts').doc(id);

  const CreatePostFirebase = async (
    title: string,
    price: number,
    description: string,
  ) => {
    try {
      await postUpload.update({
        title,
        price,
        description,
        category,
        city,
        date: new Date(),
        uid,
        deleted: false,
        isActive: true,
        user,
        phone,
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <Formik
      initialValues={{title: '', price: 0, description: ''}}
      onSubmit={async values => {
        CreatePostFirebase(values.title, values.price, values.description);
        dispatch(reset());
        navigation.navigate('PublishPost1');
        navigation.navigate('Home');
      }}
      validationSchema={validationSchema}>
      {({handleSubmit, isValid, handleChange, handleBlur, values, touched}) => (
        <View style={tw.style(BodyStyle)}>
          <View style={tw`h-10 relative`}>
            <Pressable
              style={tw`absolute left-4`}
              onPress={() => {
                dispatch(reset());
                navigation.navigate('PublishPost1');
                navigation.navigate('Home');
              }}>
              <XMarkIcon size={30} color="black" />
            </Pressable>
            <Text
              style={tw.style(
                'absolute self-center text-2xl font-bold text-white mb-6',
              )}>
              Créer une annonce
            </Text>
          </View>
          <ScrollView style={tw`p-4`}>
            <Text style={tw.style(Hstyle)}>Titre</Text>
            <TextInput
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
              style={tw`mt-5 border border-slate-300 h-12 rounded p-2`}
            />
            <Text>
              <ErrorMessage name={'title'} />
            </Text>
            <Text style={tw.style(Hstyle)}>Price</Text>
            <TextInput
              onChangeText={handleChange('price')}
              onBlur={handleBlur('price')}
              value={values.price.toString()}
              style={tw`mt-5 border border-slate-300 h-12 rounded p-2`}
            />
            <Text>
              <ErrorMessage name={'price'} />
            </Text>
            <Text style={tw.style(Hstyle)}>Description</Text>
            <TextInput
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
              multiline
              style={tw.style(`mt-5 border border-slate-300 h-52 rounded p-2`, {
                textAlignVertical: 'top',
              })}
            />
            <Text>
              <ErrorMessage name={'description'} />
            </Text>
          </ScrollView>

          <View style={tw`flex justify-center pt-4`}>
            <Pressable
              onPress={() => handleSubmit()}
              style={tw.style(
                `flex border rounded-lg w-[80%] h-12 self-center justify-center bg-zinc-400`,
                {
                  'bg-blue-600':
                    touched.title === true &&
                    touched.description === true &&
                    touched.price === true &&
                    isValid,
                },
              )}>
              <Text style={tw`flex mx-auto text-xl font-bold text-white`}>
                Continuer
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </Formik>
  );
};
