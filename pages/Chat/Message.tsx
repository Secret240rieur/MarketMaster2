import {View, Text} from 'react-native';

import tw from 'twrnc';
import moment from 'moment';

export const Message = ({
  text,
  date,
  index,
  data,
  uid,
}: {
  text: string;
  date: any;
  // firebase.firestore.Timestamp;
  index: number;
  data: Message[];
  uid: string | undefined;
}) => {
  const isSender = data[index].sender === uid;
  console.log(isSender);
  return (
    <View
      style={tw.style(`w-full items-end mt-3`, {
        'items-start': !isSender,
      })}>
      <View
        style={tw.style(
          `w-auto max-w-[80%] min-w-[35%] bg-blue-600 rounded-10 rounded-${
            isSender ? 'r' : 'l'
          }-0 pr-2 pl-3 py-1 flex-col`,
          {'bg-gray-500': !isSender},
        )}>
        <Text style={tw`text-lg text-white`}>{text}</Text>
        <Text style={tw`self-end text-xs text-zinc-400`}>
          {' '}
          {moment(date.toDate()).format('LT')}
        </Text>
      </View>
    </View>
  );
};
