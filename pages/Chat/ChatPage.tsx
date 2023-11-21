import {
  View,
  Image,
  Text,
  Pressable,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import tw from 'twrnc';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../Store';
import {setImagesUrl} from '../InfoSlice';
import {Hstyle} from '../Style';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {Message} from './Message';
import {getConversationId} from '../../src/Tools';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import {CameraIcon} from 'react-native-heroicons/outline';
import {GlobalScreenContainer} from '../GlobalScreenContainer';

export const ChatPage = ({route}: any) => {
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const imagesUrl = useSelector((state: RootState) => state.info.imagesUrl);
  const [images, setImages] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const navigator = useNavigation<any>();
  const uid = useSelector((state: RootState) => state.info.uid);
  const [data, setData] = useState<Message[]>([]);
  const [msgId, setMsgId] = useState<string>('');
  const txtColor = route.params.txtColor;
  const icnColor = route.params.icnColor;
  useEffect(() => {
    (async () => {
      const UUID = uuid.v4();
      setMsgId(UUID.toString());
    })();
  }, [message]);

  let id = '';
  if (route.params.adUid !== uid) {
    id = getConversationId(route.params.adUid, uid!, route.params.aid);
  } else {
    id = route.params.id;
  }

  console.log(id);

  const messageInputRef = useRef<TextInput>(null);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [refreshing]);

  const pickImage = async () => {
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   // We can specify whether we need only Images or Videos
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    //   // 0 means compress for small size, 1 means compress for maximum quality
    // });
    // if (!result.canceled) {
    //   uploadImage(result.assets[0].uri);
    // }
  };

  const uploadImage = async (image: string) => {
    const blob = await new Promise<Blob>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response as Blob);
      };
      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', image, true);
      xhr.send(null);
    });

    const ref = storage()
      .ref()
      .child(`Pictures/` + image.split('/').pop());
    const snapshot = ref.put(blob);

    snapshot.on(
      'state_changed',
      () => {
        setUploading(true);
      },
      error => {
        setUploading(false);
        console.log(error);
        return;
      },
      () => {
        snapshot.snapshot?.ref.getDownloadURL().then(url => {
          setUploading(false);
          dispatch(setImagesUrl([...imagesUrl, url]));
          setImages([...images, image]);
          //   empty = false;
          return;
        });
      },
    );
  };

  async function sendMessage() {
    if (message !== '') {
      try {
        // const db = firestore();
        const date = firestore.FieldValue.serverTimestamp();
        console.log('message' + message);
        await firestore().runTransaction(async transaction => {
          const conversationRef = firestore()
            .collection('conversations')
            .doc(id);
          if (uid !== route.params.adUid) {
            transaction.set(
              conversationRef,
              {
                participants: [uid, route.params.adUid],
                image: route.params.image,
                title: route.params.title,
                id,
                price: route.params.price,
                date,
                message,
                adUid: route.params.adUid,
                aid: route.params.aid,
              },
              {merge: true},
            );
          } else {
            transaction.set(
              conversationRef,
              {
                image: route.params.image,
                title: route.params.title,
                id: route.params.id,
                price: route.params.price,
                date,
                message,
                adUid: route.params.adUid,
              },
              {merge: true},
            );
          }
          const messagesRef = firestore()
            .collection('conversations')
            .doc(id)
            .collection('messages')
            .doc(msgId);

          transaction.set(messagesRef, {
            message,
            date,
            receiver: route.params.adUid,
            sender: uid,
            msgId,
          });
        });
      } catch (e) {
        console.error('Error adding document: ', e);
      } finally {
        setMessage('');
        messageInputRef.current?.clear();
      }
    }
  }

  useEffect(() => {
    const loadMessage = async () => {
      if (uid) {
        const messagesRef = firestore()
          .collection('conversations')
          .doc(id)
          .collection('messages');

        messagesRef.orderBy('date', 'asc').onSnapshot(snapshot => {
          const tmp: Message[] = snapshot.docs.map(
            doc => doc.data() as Message,
          );
          setData(tmp);
        });
      }
    };
    loadMessage();
  }, [refreshing]);

  return (
    <GlobalScreenContainer>
      <SafeAreaView style={tw.style(`flex-1 justify-between`)}>
        <Pressable
          style={tw`flex flex-row p-4 gap-2`}
          onPress={() =>
            navigator.navigate({
              name: 'AdPage',
              params: {
                id: route.params.aid,
                txtColor,
                icnColor,
              },
            })
          }>
          <Image
            source={{uri: route.params.image}}
            style={tw`w-20 h-20 rounded-5`}
          />
          <Text style={tw.style(Hstyle, txtColor, `w-3/4`)}>
            {route.params.title}
          </Text>
        </Pressable>
        <View style={tw.style(`h-3/4 px-4`)}>
          <FlatList
            data={data}
            renderItem={({item, index}) => (
              <Message
                text={item.message}
                date={item.date}
                index={index}
                data={data}
                uid={uid}
              />
            )}
            keyExtractor={item => item.msgId}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -200}>
          <View
            style={tw`flex-row justify-between px-4 h-15 border-t-2 border-[#3f3f46] bg-black`}>
            <Pressable style={tw` justify-center`} onPress={pickImage}>
              <CameraIcon size={24} color="grey" />
            </Pressable>
            <TextInput
              multiline
              ref={messageInputRef}
              style={tw`w-3/4 text-xl text-[#d1d5db] py-3 `}
              onChangeText={setMessage}
              placeholder="Aa"
              placeholderTextColor={'#d1d5db'}
              value={message}
            />
            <Pressable style={tw` justify-center`} onPress={sendMessage}>
              <Text style={tw`text-gray-300 font-bold`}>Send</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GlobalScreenContainer>
  );
};
