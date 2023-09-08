import { TouchableRipple } from 'react-native-paper';
import React from 'react';

function BtnRippleEffect({children, onPress}) {
    return (
        <>
          <TouchableRipple  onPress={onPress}>
          {children}
          </TouchableRipple>
    </>
    )
  }
export default BtnRippleEffect;

