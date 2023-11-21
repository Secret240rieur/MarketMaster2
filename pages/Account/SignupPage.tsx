import {
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
import {ErrorMessage, Formik} from 'formik';
import * as Yup from 'yup';
import {CreateUser} from './CreateUser';
import {Selectable} from './Selectable';
import {useSelector} from 'react-redux';
import {RootState} from '../Store';
import {useEffect, useRef, useState} from 'react';
import {KeyboardAccessoryNavigation} from 'react-native-keyboard-accessory';
import React from 'react';
import {FlagIcon, InformationCircleIcon} from 'react-native-heroicons/outline';
import {GlobalScreenContainer} from '../GlobalScreenContainer';
import {ProfilClass} from './ProfilClass';

export const SignupPage = ({navigation, route}: any) => {
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
  const txtColor = route.params.txtColor;
  const icnColor = route.params.icnColor;

  const [currentRef, setCurrentRef] =
    useState<React.RefObject<TextInput>>(nameRef);
  const ref = (i: number) =>
    i === 0
      ? nameRef
      : i === 1
      ? emailRef
      : i === 2
      ? emailConfRef
      : i === 3
      ? passwordRef
      : i === 4
      ? passConfRef
      : phoneRef;

  const val = (i: number, values: any) =>
    i === 0
      ? values.name
      : i === 1
      ? values.email
      : i === 2
      ? values.emailconf
      : i === 3
      ? values.password
      : i === 4
      ? values.passconf
      : values.phone;
  const {profilCreate} = ProfilClass({});

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
          <GlobalScreenContainer>
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
                      'absolute self-center text-2xl font-bold',
                      txtColor,
                    )}>
                    Sign up
                  </Text>
                </View>
                <ScrollView>
                  <KeyboardAvoidingView
                    behavior="position"
                    keyboardVerticalOffset={
                      Platform.OS === 'ios' ? -500 : -500
                    }>
                    <View style={tw`mb-4 flex gap-7`}>
                      {profilCreate.map((value, i) => (
                        <View key={i} style={tw` flex gap-2`}>
                          <Text style={tw.style(Hstyle, txtColor)}>
                            {value.placeholder}
                          </Text>
                          <TextInput
                            ref={ref(i)}
                            value={val(i, values)}
                            onChangeText={handleChange(value.name)}
                            onBlur={handleBlur(value.name)}
                            placeholder={value.placeholder}
                            placeholderTextColor={'#94a3b8'}
                            style={tw.style(style, txtColor)}
                            returnKeyType="next" // Set returnKeyType to "next"
                            onFocus={() => setCurrentRef(ref(i))}
                            onSubmitEditing={handleFocusNext}
                            keyboardType={value.KeyboardType}
                          />
                          <Text style={tw.style(txtColor)}>
                            {<ErrorMessage name={value.name} />}
                          </Text>
                        </View>
                      ))}
                      <Selectable
                        title={'Ville'}
                        value={city}
                        onPress={() =>
                          navigation.navigate({
                            name: 'Cities',
                            params: {txtColor, icnColor},
                          })
                        }
                        icon={<FlagIcon size={30} color={icnColor} />}
                        txtColor={txtColor}></Selectable>
                      <Text style={tw.style(txtColor)}>
                        Please choose a city
                      </Text>
                    </View>
                  </KeyboardAvoidingView>
                  <View style={tw`flex flex-row gap-1 justify-center mt-4`}>
                    <InformationCircleIcon
                      size={24}
                      color={icnColor}
                      style={tw`mt-1`}
                    />
                    <Text style={tw.style(Tstyle, txtColor, `text-center `)}>
                      En cliquant sur 'Créer mon compte' j'accepte la politique
                      de confidentialité de MarketMaster
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => handleSubmit()}
                    style={tw.style(
                      `flex border rounded-lg w-[80%] h-15 self-center justify-center bg-zinc-400 mt-10 mb-40`,
                      {
                        'bg-black': city !== 'Tout le Maroc' && isValid,
                      },
                    )}>
                    <Text style={tw`flex mx-auto text-xl font-bold text-white`}>
                      Continuer
                    </Text>
                  </Pressable>
                </ScrollView>
              </View>
            </View>
          </GlobalScreenContainer>
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

const style = `w-full h-15 pl-4 pb-3 text-lg border rounded-lg`;
