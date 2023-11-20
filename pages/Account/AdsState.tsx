import {Text, Pressable} from 'react-native';
import tw from 'twrnc';

type Props = {
  index: number;
  i: number;
  setIndex: any;
  adsStates: any;
};

export const AdsState = ({i, index, setIndex, adsStates}: Props) => {
  return (
    <Pressable
      style={tw.style(Pstyle, index === i ? 'bg-black' : 'bg-zinc-500')}
      onPress={() => setIndex(i)}>
      <Text style={tw.style(style)}>
        {adsStates.name} ({adsStates.ads ? adsStates.ads.length : 0})
      </Text>
    </Pressable>
  );
};

const Pstyle = `rounded-3xl items-center justify-center px-4 h-10`;
const style = `text-xl font-bold text-white`;
