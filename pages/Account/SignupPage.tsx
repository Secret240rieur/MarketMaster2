import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import tw from 'twrnc';
import {BodyStyle, Hstyle, Tstyle} from '../Style';
import {ScrollView} from 'react-native-gesture-handler';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {CreateUser} from './CreateUser';
import {Selectable} from './Selectable';
import {useSelector} from 'react-redux';
import {RootState} from '../Store';
import {useEffect, useRef, useState} from 'react';
import {KeyboardAccessoryNavigation} from 'react-native-keyboard-accessory';
import React from 'react';
import {FlagIcon} from 'react-native-heroicons/outline';

export const SignupPage = ({navigation}: any) => {
  const city = useSelector((state: RootState) => state.info.city);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('name is required'),
    phone: Yup.number().required('invalid phone number'),
    email: Yup.string()
      .email('Invalid email address')
      .required('email is required'),
    emailconf: Yup.string()
      .required('confirm email please')
      .oneOf([Yup.ref('email'), null], 'emails must match'),
    password: Yup.string()
      .required('password is required')
      .min(8, 'Password must be at least 8 characters'),
    passconf: Yup.string()
      .required('password confirmation is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  // Create refs for each input field
  const nameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const emailConfRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const passConfRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);

  const [currentRef, setCurrentRef] =
    useState<React.RefObject<TextInput>>(nameRef);

  // Function to handle tab navigation
  const handleTabNavigationNext = (currentRef: React.RefObject<TextInput>) => {
    switch (currentRef) {
      case nameRef:
        emailRef.current?.focus();
        setCurrentRef(emailRef);

        break;
      case emailRef:
        emailConfRef.current?.focus();
        setCurrentRef(emailConfRef);
        break;
      case emailConfRef:
        passwordRef.current?.focus();
        setCurrentRef(passwordRef);
        break;
      case passwordRef:
        passConfRef.current?.focus();
        setCurrentRef(passConfRef);
        break;
      case passConfRef:
        phoneRef.current?.focus();
        setCurrentRef(phoneRef);
        break;
      default:
        break;
    }
  };

  const handleTabNavigationPrevious = (
    currentRef: React.RefObject<TextInput>,
  ) => {
    switch (currentRef) {
      case emailRef:
        nameRef.current?.focus();
        // setCurrentRef(nameRef);
        break;
      case emailConfRef:
        emailRef.current?.focus();
        // setCurrentRef(emailRef);

        break;
      case passwordRef:
        emailConfRef.current?.focus();
        // setCurrentRef(emailConfRef);
        break;
      case passConfRef:
        passwordRef.current?.focus();
        // setCurrentRef(passwordRef);
        break;
      case phoneRef:
        passConfRef.current?.focus();
        // setCurrentRef(passConfRef);
        break;
      default:
        break;
    }
  };

  const [nextFocusDisabled, setNextFocusDisabled] = useState(false);
  const [previousFocusDisabled, setPreviousFocusDisabled] = useState(false);

  useEffect(() => {
    // Focus on the first input field when the component mounts
    nameRef.current?.focus();
  }, []);

  useEffect(() => {
    setNextFocusDisabled(currentRef === phoneRef);
    setPreviousFocusDisabled(currentRef === nameRef);
  }, [currentRef, phoneRef, nameRef]);

  const handleFocusNext = () => {
    if (nextFocusDisabled) {
      return;
    }

    handleTabNavigationNext(currentRef);
  };

  const handleFocusPrevious = () => {
    if (previousFocusDisabled) {
      return;
    }
    handleTabNavigationPrevious(currentRef);
  };

  return (
    <View style={tw`flex-1`}>
      <Formik
        initialValues={{
          email: '',
          emailconf: '',
          password: '',
          passconf: '',
          name: '',
          phone: '',
        }}
        onSubmit={async value => {
          await CreateUser({
            name: value.name,
            email: value.email,
            phone: value.phone,
            password: value.password,
            city,
          });
          navigation.navigate('Home');
        }}
        validationSchema={validationSchema}>
        {({
          handleSubmit,
          isValid,
          handleChange,
          handleBlur,
          values,
          touched,
        }) => (
          // <View>
          <View style={tw.style(BodyStyle)}>
            <View style={tw`px-4`}>
              <View style={tw`h-10 relative mb-15`}>
                <Pressable
                  style={tw`absolute left-4`}
                  onPress={() => navigation.navigate('Home')}>
                  {/* <Entypo name="cross" size={30} color="white" /> */}
                </Pressable>
                <Text
                  style={tw.style(
                    'absolute self-center text-2xl font-bold text-white ',
                  )}>
                  Sign up
                </Text>
              </View>
              <ScrollView>
                <KeyboardAvoidingView
                  behavior="position"
                  keyboardVerticalOffset={Platform.OS === 'ios' ? -500 : -500}>
                  <View style={tw`mb-4 flex gap-7`}>
                    <View style={tw` flex gap-2`}>
                      <Text style={tw.style(Hstyle)}>Full name</Text>
                      <TextInput
                        ref={nameRef}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                        placeholder="Full name"
                        style={tw.style(style)}
                        returnKeyType="next" // Set returnKeyType to "next"
                        onFocus={() => setCurrentRef(nameRef)}
                        onSubmitEditing={handleFocusNext}
                      />
                    </View>
                    <View style={tw` flex gap-2`}>
                      <Text style={tw.style(Hstyle)}>Email</Text>
                      <TextInput
                        ref={emailRef}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        placeholder="Email"
                        keyboardType="email-address"
                        returnKeyType="next" // Set returnKeyType to "next"
                        style={tw.style(style)}
                        onFocus={() => setCurrentRef(emailRef)}
                        onSubmitEditing={handleFocusNext}
                      />
                    </View>
                    <View style={tw` flex gap-2`}>
                      <Text style={tw.style(Hstyle)}>Confirm email</Text>
                      <TextInput
                        ref={emailConfRef}
                        onChangeText={handleChange('emailconf')}
                        onBlur={handleBlur('emailconf')}
                        value={values.emailconf}
                        placeholder="Confirm email"
                        keyboardType="email-address"
                        returnKeyType="next" // Set returnKeyType to "next"
                        style={tw.style(style)}
                        onFocus={() => setCurrentRef(emailConfRef)}
                        onSubmitEditing={handleFocusNext}
                      />
                    </View>
                    <View style={tw` flex gap-2`}>
                      <Text style={tw.style(Hstyle)}>Password</Text>
                      <TextInput
                        ref={passwordRef}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        placeholder="Password"
                        returnKeyType="next" // Set returnKeyType to "next"
                        style={tw.style(style)}
                        onFocus={() => setCurrentRef(passwordRef)}
                        onSubmitEditing={handleFocusNext}
                      />
                    </View>
                    <View style={tw` flex gap-2`}>
                      <Text style={tw.style(Hstyle)}>Confirm password</Text>
                      <TextInput
                        ref={passConfRef}
                        onChangeText={handleChange('passconf')}
                        onBlur={handleBlur('passconf')}
                        value={values.passconf}
                        placeholder="Confirm password"
                        returnKeyType="next" // Set returnKeyType to "next"
                        style={tw.style(style)}
                        onFocus={() => setCurrentRef(passConfRef)}
                        onSubmitEditing={handleFocusNext}
                      />
                    </View>
                    <View style={tw` flex gap-2`}>
                      <Text style={tw.style(Hstyle)}>Phone number</Text>
                      <TextInput
                        ref={phoneRef}
                        keyboardType="numeric"
                        onChangeText={handleChange('phone')}
                        onBlur={handleBlur('phone')}
                        value={values.phone}
                        style={tw.style(style)}
                        placeholder="Phone number"
                        onFocus={() => setCurrentRef(phoneRef)}
                      />
                    </View>
                    <Selectable
                      title={'Ville'}
                      value={city}
                      onPress={() => navigation.push('Cities')}
                      icon={<FlagIcon size={30} color="white" />}></Selectable>
                  </View>
                </KeyboardAvoidingView>
                <Text style={tw.style(Tstyle, `mt-4`)}>
                  En cliquant sur 'Créer mon compte' j'accepte la politique de
                  confidentialité de MarketMaster
                </Text>
                <Pressable
                  onPress={() => handleSubmit()}
                  style={tw.style(
                    `flex border rounded-lg w-full h-15 self-center justify-center bg-zinc-400 mb-40`,
                    {
                      'bg-blue-600':
                        touched.password === true &&
                        touched.email === true &&
                        touched.name === true &&
                        touched.phone === true &&
                        city !== 'Tout le Maroc' &&
                        isValid,
                    },
                  )}>
                  <Text style={tw`flex mx-auto text-xl font-bold text-white`}>
                    Continuer
                  </Text>
                </Pressable>
              </ScrollView>
            </View>
          </View>
        )}
      </Formik>
      <KeyboardAccessoryNavigation
        nextDisabled={nextFocusDisabled}
        previousDisabled={previousFocusDisabled}
        onNext={handleFocusNext}
        onPrevious={handleFocusPrevious}
        avoidKeyboard
        androidAdjustResize
      />
    </View>
  );
};

const style = `bg-white w-full h-15 pl-4 pb-3 text-lg rounded-lg`;
