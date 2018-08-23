import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import SmallHexView from './SmallHexView';

import CustomText from '../components/CustomText';

export default class SmallPlayerBox extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {
    // //console.log('Props passed to box: ', this.props.playerInfo);
  }

  render() {

    return (
      <View>
        <SmallHexView color={this.props.displayInfo.color}>
          <CustomText>{this.props.displayInfo.name}</CustomText>
        </SmallHexView>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     width: 100,
//     height: 100,
//     marginBottom: 10,
//   }
// });
