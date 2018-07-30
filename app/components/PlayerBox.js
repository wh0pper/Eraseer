
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import HexView from './HexView';

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
    // //console.log('current screen passed to PlayerBox: ',this.props.currentScreen);
    let screen = this.props.currentScreen;
    let box = null;
    if (screen === 'registration') {
      box = (
        <HexView color={this.props.displayInfo.color} position={this.props.displayInfo.position}>
        {/* // <View style={[styles.container, {backgroundColor: this.props.displayInfo.color}]}> */}
          <Text style={{color: '#cfcfcf', fontSize: 20}}>{this.props.displayInfo.name}</Text>
        </HexView>
        // </View>
      )
    } else if (screen === 'game') {
      box = (
        <View style={[styles.container, {backgroundColor: this.props.displayInfo.color}]}>
          <Text style={{color: '#cfcfcf', fontSize: 20}}>{this.props.displayInfo.name}</Text>
        </View>
      )
    } else if (screen === 'score') {
      box = (
        <View style={[styles.container, {backgroundColor: this.props.displayInfo.color}]}>
          <Text style={{color: '#cfcfcf', fontSize: 20}}>{this.props.displayInfo.name}</Text>
          <Text style={{color: '#cfcfcf', fontSize: 20}}>{this.props.displayInfo.points}</Text>
        </View>
      )
    }


    return (
      <View>
        {box}
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
