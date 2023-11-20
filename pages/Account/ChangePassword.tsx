import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import tw from 'twrnc';
import {BodyStyle} from '../Style';
import {ErrorMessage, Formik} from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/auth';
import {ProfilInput} from './ProfilInput';
import {ContinueButton} from '../Annonce/ContinueButton';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {GlobalScreenContainer} from '../GlobalScreenContainer';

export const ChangePassword = ({route}: any) => {
  const user = auth().currentUser;
  const navigation = useNavigation<any>();
  const isDarkMode = route.params.isDarkMode;
  const txtColor = route.params.txtColor;

  const pwInputs = [
    {
      autoFocus: true,
      name: 'oldPassword',
      title: 'Ancien mot de passe',
      placeholder: 'Old password',
    },
    {
      name: 'password',
      title: 'Nouveau mot de passe',
      placeholder: 'New password',
    },
    {
      name: 'passconf',
      title: 'Confirmez mot de passe',
      placeholder: 'Confirm password',
    },
  ];
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('old password is required'),
    password: Yup.string()
      .required('password is required')
      .min(8, 'Password must be at least 8 characters'),
    passconf: Yup.string()
      .required('password confirmation is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });
  const resetUserPassword = async ({
    oldPassword,
    newPassword,
  }: {
    oldPassword: string;
    newPassword: string;
  }) => {
    if (user && user.email) {
      const cred = firebase.EmailAuthProvider.credential(
        user.email,
        oldPassword,
      );

      try {
        await user.reauthenticateWithCredential(cred);

        // User entered correct credentials
        // Update password
        await user.updatePassword(newPassword);
      } catch (e) {
        console.error(e.code, e.message);
        // Could be incorrect credentials
      }
    }
  };
  return (
    <GlobalScreenContainer>
      <View style={tw.style(BodyStyle, `px-4`)}>
        {user && (
          <Formik
            initialValues={{
              oldPassword: '',
              password: '',
              passconf: '',
            }}
            onSubmit={value => {
              resetUserPassword({
                oldPassword: value.oldPassword,
                newPassword: value.password,
              });
              navigation.navigate('ProfilPage');
            }}
            validationSchema={validationSchema}>
            {({handleSubmit, isValid, handleChange, values}) => (
              <View style={tw.style(`flex-1`)}>
                <Text
                  style={tw.style(
                    txtColor,
                    `text-2xl font-bold self-center mb-10`,
                  )}>
                  Modifier mon profile
                </Text>
                <ScrollView>
                  <KeyboardAvoidingView
                    behavior="position"
                    keyboardVerticalOffset={
                      Platform.OS === 'ios' ? -200 : -500
                    }>
                    <View style={tw.style(`gap-10 mt-25 mb-10`)}>
                      {pwInputs.map((value, i) => (
                        <ProfilInput
                          key={i}
                          autoFocus={value.autoFocus}
                          onChangeText={handleChange(value.name)}
                          title={value.title}
                          value={
                            i === 0
                              ? values.oldPassword
                              : i === 1
                              ? values.password
                              : values.passconf
                          }
                          placeholder={value.placeholder}
                          errorMessage={<ErrorMessage name={value.name} />}
                          txtColor={txtColor}
                          isDarkMode={isDarkMode}
                        />
                      ))}
                    </View>
                  </KeyboardAvoidingView>
                </ScrollView>
                <ContinueButton
                  handleSubmit={handleSubmit}
                  isValid={isValid}
                  text={'Continue'}
                />
              </View>
            )}
          </Formik>
        )}
      </View>
    </GlobalScreenContainer>
  );
};
