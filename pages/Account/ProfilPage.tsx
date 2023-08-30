import {
  Pressable,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {BodyStyle} from '../Style';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import {ProfilInput} from './ProfilInput';
import {Selectable} from './Selectable';
import {useSelector} from 'react-redux';
import {RootState} from '../Store';
import {ErrorMessage, Formik} from 'formik';
import * as Yup from 'yup';
import {UpdateUser} from './UpdateUser';
import {ContinueButton} from '../Annonce/ContinueButton';
import React from 'react';
import {
  AtSymbolIcon,
  FlagIcon,
  LockClosedIcon,
  PhoneIcon,
  PhotoIcon,
  UserIcon,
} from 'react-native-heroicons/outline';

export const ProfilPage = () => {
  const navigation = useNavigation<any>();
  const city = useSelector((state: RootState) => state.info.city);
  const user = useSelector((state: RootState) => state.info.user);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('name is required'),
    phone: Yup.number().required('invalid phone number'),
  });

  return (
    <View style={tw.style(BodyStyle, `px-4`)}>
      {user && (
        <Formik
          initialValues={{
            name: user.name,
            email: user.email,
            phone: user.phone,
            city: user.city,
          }}
          onSubmit={value => {
            UpdateUser({
              name: value.name,
              phone: value.phone,
              id: user.id,
              city,
            });
            navigation.navigate('AccountSettings');
          }}
          validationSchema={validationSchema}>
          {({handleSubmit, isValid, handleChange, values}) => (
            <View>
              <Text style={tw`text-2xl font-bold text-white self-center `}>
                Modifier mon profile
              </Text>
              <ScrollView>
                <KeyboardAvoidingView
                  behavior="position"
                  keyboardVerticalOffset={Platform.OS === 'ios' ? -200 : -500}>
                  <View
                    style={tw`flex bg-white self-center rounded-full mt-25 mb-10 p-4`}>
                    <PhotoIcon size={60} color="black" />
                  </View>
                  <View style={tw`gap-10 mb-20`}>
                    <ProfilInput
                      onChangeText={handleChange('name')}
                      title={'Nom et Prénom'}
                      value={values.name}
                      placeholder={'Full name'}
                      errorMessage={<ErrorMessage name={'name'} />}
                      icon={<UserIcon size={30} color="#3f3f46" />}
                    />
                    <ProfilInput
                      editable={false}
                      title={'Email'}
                      value={values.email}
                      icon={<AtSymbolIcon size={30} color="#3f3f46" />}
                      icon2={<LockClosedIcon size={30} color="#3f3f46" />}
                    />
                    <ProfilInput
                      keyboardType="numeric"
                      onChangeText={handleChange('phone')}
                      title={'Télephone'}
                      value={values.phone}
                      errorMessage={<ErrorMessage name={'phone'} />}
                      placeholder={'06101010'}
                      icon={<PhoneIcon size={30} color="#3f3f46" />}
                    />

                    <Selectable
                      title={'Ville'}
                      value={
                        city !== values.city && city !== 'Tout le Maroc'
                          ? city
                          : values.city
                      }
                      onPress={() => navigation.push('Cities')}
                      icon={<FlagIcon size={20} color="white" />}
                    />
                    <Selectable
                      title={'Mot de passe'}
                      value={'Modifier'}
                      onPress={() =>
                        navigation.navigate({
                          name: 'ChangePassword',
                          params: {
                            user,
                          },
                        })
                      }
                    />

                    <ContinueButton
                      handleSubmit={handleSubmit}
                      isValid={isValid}
                      text={'Continue'}
                    />
                  </View>
                </KeyboardAvoidingView>
              </ScrollView>
            </View>
          )}
        </Formik>
      )}
    </View>
  );
};
