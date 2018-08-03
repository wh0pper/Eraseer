
import React, {Component} from 'react';
import {Text} from 'react-native';


function CustomText(props) {
    return <CustomText> style={{fontSize: 22, color: '#666666'}}>{props.children}</CustomText>
  }

export default CustomText;
