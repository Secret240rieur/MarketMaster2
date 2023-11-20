import tw from 'twrnc';
import {BgNumColor, BrdColor, IcnColor, TitleStyle, TxtColor} from '../Style';
import {FlatList} from 'react-native-gesture-handler';
import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../Store';
import {View, Text, RefreshControl} from 'react-native';
import {ConversationPreview} from './ConversationPreview';
import firestore from '@react-native-firebase/firestore';
import {GlobalScreenContainer} from '../GlobalScreenContainer';

export const ConversationsListPage = () => {
  const [data, setData] = useState<Conversation[]>([]);
  const uid = useSelector((state: RootState) => state.info.uid);
  const isDarkMode = useSelector((state: RootState) => state.info.isDarkMode);
  const brdColor = BrdColor(isDarkMode);
  const txtColor = TxtColor(isDarkMode);
  const icnColor = IcnColor(isDarkMode);
  const bgNumColor = BgNumColor(isDarkMode);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [refreshing]);

  useEffect(() => {
    const loadConversations = async () => {
      if (uid) {
        try {
          const conversationsRef = firestore().collection('conversations');
          conversationsRef
            .where('participants', 'array-contains', uid)
            .orderBy('date', 'desc')
            .onSnapshot(snapshot => {
              const tmp: Conversation[] = snapshot.docs.map(
                doc => doc.data() as Conversation,
              );
              setData(tmp);
            });
        } catch (error) {
          console.error('Error fetching conversations:', error);
        }
      }
    };
    loadConversations();
  }, [refreshing]);

  return (
    <GlobalScreenContainer>
      <View style={tw.style(`flex-1 pt-10 px-4 `)}>
        <Text style={tw.style(TitleStyle, txtColor)}>Chat</Text>
        <View style={tw`h-5/6`}>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <ConversationPreview
                id={item.id}
                image={item.image}
                date={item.date}
                price={item.price}
                title={item.title}
                message={item.message}
                adUid={item.adUid}
                aid={item.aid}
                txtColor={txtColor}
                brdColor={brdColor}
              />
            )}
            keyExtractor={item => item.message}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      </View>
    </GlobalScreenContainer>
  );
};
