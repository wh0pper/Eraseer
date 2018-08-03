import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import MediumHexView from './MediumHexView';

import CustomText from './CustomText';

export default class MediumPlayerBox extends Component {
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
        <MediumHexView color={this.props.displayInfo.color}>
          <CustomText>{this.props.displayInfo.name}</CustomText>
        </MediumHexView>
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
