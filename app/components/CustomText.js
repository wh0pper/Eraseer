
import React, {Component} from 'react';
import {Text} from 'react-native';


function CustomText(props) {
    return <Text style={{fontSize: 19, color: '#7f7f7f', textAlign: 'center'}}>{props.children}</Text>
  }

export default CustomText;
