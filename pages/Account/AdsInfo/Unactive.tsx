import {useSelector} from 'react-redux';
import {RootState} from '../../Store';
import {AccountAds} from './AccountAds';
import React from 'react';

export const Unactive = () => {
  const disabledAds = useSelector((state: RootState) => state.info.disabledAds);

  return <AccountAds adState={disabledAds} />;
};
