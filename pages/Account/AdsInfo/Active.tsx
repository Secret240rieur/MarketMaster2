import {useSelector} from 'react-redux';
import {RootState} from '../../Store';
import {AccountAds} from './AccountAds';
import React from 'react';

export const Active = () => {
  const activeAds = useSelector((state: RootState) => state.info.activeAds);

  return <AccountAds adState={activeAds} />;
};
