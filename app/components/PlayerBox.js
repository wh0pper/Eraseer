import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import HexView from './HexView';
import ClaimedHexView from './ClaimedHexView';

import CustomText from './CustomText';

export default class PlayerBox extends Component {
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
      <View style={styles.container}>
        { this.props.displayInfo && this.props.displayInfo.isClaimed ?
          <ClaimedHexView color={this.props.displayInfo.color || 'red'}>
            <CustomText> style={{color: '#cfcfcf', fontSize: 20}}>{this.props.displayInfo.name}</CustomText>
          </ClaimedHexView>
          :
          <HexView color={this.props.displayInfo.color}>
            <CustomText> style={{color: '#cfcfcf', fontSize: 20}}>{this.props.displayInfo.name}</CustomText>
          </HexView>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
