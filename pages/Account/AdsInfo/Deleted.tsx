import {useSelector} from 'react-redux';
import {AccountAds} from './AccountAds';
import {RootState} from '../../Store';
import React from 'react';

export const Deleted = () => {
  const deletedAds = useSelector((state: RootState) => state.info.deletedAds);

  return <AccountAds adState={deletedAds} />;
};
