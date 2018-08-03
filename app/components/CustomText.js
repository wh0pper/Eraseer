
import React, {Component} from 'react';
import {Text} from 'react-native';


function CustomText(props) {
    return <Text style={{fontSize: 22, color: '#666666'}}>{props.children}</Text>
  }

export default CustomText;
