import {useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import tw from 'twrnc';
import {BodyStyle, Hstyle, IcnColor, Tstyle, TxtColor} from '../Style';
import {Signin} from './Signin';
import React from 'react';
import {XMarkIcon} from 'react-native-heroicons/outline';
import {GlobalScreenContainer} from '../GlobalScreenContainer';
import {useSelector} from 'react-redux';
import {RootState} from '../Store';

export const LoginPage = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isDarkMode = useSelector((state: RootState) => state.info.isDarkMode);
  const txtColor = TxtColor(isDarkMode);
  const icnColor = IcnColor(isDarkMode);
  return (
    <GlobalScreenContainer>
      <View style={tw.style(BodyStyle, `px-4`)}>
        <View style={tw`h-10 relative mb-15`}>
          <Pressable
            style={tw`absolute left-4`}
            onPress={() => navigation.navigate('Home')}>
            <XMarkIcon size={30} color={icnColor} />
          </Pressable>
          <Text
            style={tw.style(
              'absolute self-center text-2xl font-bold  ',
              txtColor,
            )}>
            Connexion
          </Text>
        </View>
        <View style={tw`flex gap-20`}>
          <View style={tw`flex gap-10`}>
            <View style={tw` flex gap-2`}>
              <Text style={tw.style(Hstyle, txtColor)}>Email</Text>
              <TextInput
                onChangeText={setEmail}
                placeholder="Email"
                placeholderTextColor={'#94a3b8'}
                keyboardType="email-address"
                style={tw.style(style, txtColor)}
              />
            </View>
            <View style={tw` flex gap-2`}>
              <Text style={tw.style(Hstyle, txtColor)}>Password</Text>
              <TextInput
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor={'#94a3b8'}
                secureTextEntry={true}
                style={tw.style(style)}
                onSubmitEditing={() => Signin(email, password)}
                returnKeyType="done"
              />
            </View>
          </View>
          <Pressable
            style={tw.style(
              'bg-black py-2 w-full flex flex-row  justify-center items-center rounded-[30px] h-15',
            )}
            onPress={() => Signin(email, password)}>
            <Text style={tw.style('font-bold text-xl text-white')}>Login</Text>
          </Pressable>
        </View>
        <View style={tw`flex flex-row justify-between mt-7`}>
          <Text style={tw.style('text-lg', txtColor)}>Pas encore inscrit?</Text>
          <Pressable
            onPress={() =>
              navigation.navigate({
                name: 'SignupPage',
                params: {
                  txtColor,
                  icnColor,
                },
              })
            }>
            <Text style={tw.style(Tstyle, 'text-[#94a3b8]')}>
              {' '}
              S‘inscrire gratuitement
            </Text>
          </Pressable>
        </View>
      </View>
    </GlobalScreenContainer>
  );
};

const style = `h-15 pl-4 text-lg border rounded-lg pb-3`;
