import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {BodyStyle, IcnColor, TxtColor} from '../Style';
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
import {PhotoIcon} from 'react-native-heroicons/outline';
import {ProfilClass} from './ProfilClass';
import {GlobalScreenContainer} from '../GlobalScreenContainer';

export const ProfilPage = () => {
  const navigation = useNavigation<any>();
  const city = useSelector((state: RootState) => state.info.city);
  const user = useSelector((state: RootState) => state.info.user);
  const isDarkMode = useSelector((state: RootState) => state.info.isDarkMode);
  const txtColor = TxtColor(isDarkMode);
  const icnColor = IcnColor(isDarkMode);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('name is required'),
    phone: Yup.number().required('invalid phone number'),
  });

  const {selectableInfo, profilInfo} = ProfilClass({
    icnColor,
    txtColor,
    user: user!,
    isDarkMode,
  });

  return (
    <GlobalScreenContainer>
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
                <Text
                  style={tw.style(`text-2xl font-bold self-center `, txtColor)}>
                  Modifier mon profile
                </Text>
                <ScrollView>
                  <KeyboardAvoidingView
                    behavior="position"
                    keyboardVerticalOffset={
                      Platform.OS === 'ios' ? -200 : -500
                    }>
                    <View
                      style={tw`flex bg-white self-center rounded-full mt-25 mb-10 p-4`}>
                      <PhotoIcon size={60} color="black" />
                    </View>
                    <View style={tw`gap-10 mb-20`}>
                      {profilInfo.map((value, i) => (
                        <ProfilInput
                          key={i}
                          editable={value.editable}
                          keyboardType={value.keyboardType}
                          onChangeText={handleChange(value.name)}
                          errorMessage={<ErrorMessage name={value.name} />}
                          placeholder={value.placeholder}
                          icon={value.icon}
                          icon2={value.icon2}
                          txtColor={txtColor}
                          isDarkMode={isDarkMode}
                          title={value.title}
                          value={
                            i === 0
                              ? values.name
                              : i === 1
                              ? values.email
                              : values.phone
                          }
                        />
                      ))}
                      {selectableInfo.map((value, i) => (
                        <Selectable
                          key={i}
                          txtColor={txtColor}
                          title={value.title}
                          value={
                            i === 0
                              ? city !== values.city && city !== 'Tout le Maroc'
                                ? city
                                : values.city
                              : value.value!
                          }
                          onPress={() => navigation.navigate(value.screen)}
                          icon={value.icon}
                        />
                      ))}

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
    </GlobalScreenContainer>
  );
};
