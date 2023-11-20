import {View} from 'react-native';
import tw from 'twrnc';
// import {BgColor} from './Style';
import {useSelector} from 'react-redux';
import {RootState} from './Store';

export const GlobalScreenContainer = ({children}: any) => {
  const isDarkMode = useSelector((state: RootState) => state.info.isDarkMode);
  const BgColor = (isDarkMode: boolean) =>
    isDarkMode ? 'bg-zinc-800' : 'bg-slate-200';
  const bgColor = BgColor(isDarkMode);
  return <View style={tw.style(bgColor, 'flex-1')}>{children}</View>;
};
