import {Active} from './Active';
import {Deleted} from './Deleted';
import {PendingPaiement} from './PendingPaiement';
import {Rejected} from './Rejected';
import {Unactive} from './Unactive';
import React from 'react';

export const AdsInfoSwitch = (index: number) => {
  switch (index) {
    case 0: {
      return <Active />;
    }
    // case 1: {
    //   return <Rejected />;
    // }
    case 1: {
      return <Unactive />;
    }
    case 2: {
      return <Deleted />;
    }
    // case 4: {
    //   return <PendingPaiement />;
    // }
  }
};
