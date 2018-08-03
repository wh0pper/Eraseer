
import React, {Component} from 'react';
import {Animated, Text, Easing, Platform, StyleSheet, View, Button} from 'react-native';

import CustomText from './CustomText';
import DoubleHexView from './DoubleHexView';


export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    // this.startRotation();
    // this.focusListener = this.props.navigation.addListener('willFocus', this.componentWillFocus.bind(this));
  }

  componentWillUnmount() {

  }

  static getDerivedStateFromProps(props, state) {
    console.log('timer got props n state', props, state);
    // tickOnce();
    return null;
  }

  render() {

    return (
      <View style={styles.container}>
        <DoubleHexView
          rotationInterpolation={this.props.rotationInterpolation}/>
        <View style={{top: -200}}>
          <Text style={{fontSize: 35, color: '#8f8f8f'}}>{this.props.seconds}</Text>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rotatingContainer: {
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rect: {
    position: 'absolute',
    width: 259.808,
    height: 150,
    borderStyle: 'solid',
    borderRightColor: 'darkgray',
    borderRightWidth: 1,
    borderLeftColor: 'darkgray',
    borderLeftWidth: 1,
  },
  two: {
    transform: [
      { rotate: '-60deg' }
    ]
  },
  three: {
    transform: [
      { rotate: '60deg' }
    ]
  },
  four: {
    transform: [
      { rotate: '30deg' }
    ]
  },
  five: {
    transform: [
      { rotate: '-30deg' }
    ]
  },
  six: {
    transform: [
      { rotate: '90deg' }
    ]
  }
});
