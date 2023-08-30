import {useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import tw from 'twrnc';
import {BodyStyle, Hstyle, Tstyle} from '../Style';
import {Signin} from './Signin';
import React from 'react';
import {XMarkIcon} from 'react-native-heroicons/outline';

export const LoginPage = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={tw.style(BodyStyle, `px-4`)}>
      <View style={tw`h-10 relative mb-15`}>
        <Pressable
          style={tw`absolute left-4`}
          onPress={() => navigation.navigate('Home')}>
          <XMarkIcon size={30} color="white" />
        </Pressable>
        <Text
          style={tw.style(
            'absolute self-center text-2xl font-bold text-white ',
          )}>
          Connexion
        </Text>
      </View>
      <View style={tw`flex gap-20`}>
        <View style={tw`flex gap-10`}>
          <View style={tw` flex gap-2`}>
            <Text style={tw.style(Hstyle)}>Email</Text>
            <TextInput
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
              style={tw.style(style)}
            />
          </View>
          <View style={tw` flex gap-2`}>
            <Text style={tw.style(Hstyle)}>Password</Text>
            <TextInput
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry={true}
              style={tw.style(style)}
              onSubmitEditing={() => Signin(email, password)}
              returnKeyType="done"
            />
          </View>
        </View>
        <Pressable
          style={tw.style(
            'bg-green-700 py-2 w-full flex flex-row  justify-center items-center rounded-[30px] h-15',
          )}
          onPress={() => Signin(email, password)}>
          <Text style={tw.style('font-bold text-xl text-white')}>Login</Text>
        </Pressable>
      </View>
      <View style={tw`flex flex-row justify-between mt-7`}>
        <Text style={tw`text-lg text-white`}>Pas encore inscrit?</Text>
        <Pressable onPress={() => navigation.navigate('SignupPage')}>
          <Text style={tw.style(Tstyle)}> S‘inscrire gratuitement</Text>
        </Pressable>
      </View>
    </View>
  );
};

const style = `bg-white h-15 pl-4 text-lg rounded-lg pb-3`;
