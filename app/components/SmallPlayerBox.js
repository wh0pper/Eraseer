
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import SmallHexView from './SmallHexView';

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
          <Text style={{color: '#cfcfcf', fontSize: 20}}>{this.props.displayInfo.name}</Text>
        </SmallHexView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    marginBottom: 10,
    // transform: [{ rotate: '60deg'}]
  }
});
