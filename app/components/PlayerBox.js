import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import HexView from './HexView';
import ClaimedHexView from './ClaimedHexView';

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
            <Text style={{color: '#cfcfcf', fontSize: 20}}>{this.props.displayInfo.name}</Text>
          </ClaimedHexView>
          :
          <HexView color={this.props.displayInfo.color}>
            <Text style={{color: '#cfcfcf', fontSize: 20}}>{this.props.displayInfo.name}</Text>
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
