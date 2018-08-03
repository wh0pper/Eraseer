
import React, {Component} from 'react';
import {Animated, Text, Easing, Platform, StyleSheet, View, Button} from 'react-native';

import CustomText from './CustomText';
import DoubleHexView from './DoubleHexView';

// const rotateValue = new Animated.Value(0);
// function tickOnce() {
//   Animated.timing(
//     rotateValue,
//     {
//       toValue: 1,
//       duration: 1000,
//       easing: Easing.cubic
//     }
//   ).start();
// }

export default class Timer extends Component {
  constructor(props) {
    super(props);
    // this.rotateValue = new Animated.Value(0);
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

  // tickOnce() {
    // Animated.sequence([
      // Animated.timing(
      //   this.rotateValue,
      //   {
      //     toValue: 1,
      //     duration: 1000,
      //     easing: Easing.cubic
      //   }
      // ).start();
    //   Animated.timing(
    //     this.rotateValue,
    //     {
    //       toValue: .2,
    //       duration: 1000,
    //       easing: Easing.cubic
    //     }
    //   ),
    //   Animated.timing(
    //     this.rotateValue,
    //     {
    //       toValue: .3,
    //       duration: 1000,
    //       easing: Easing.cubic
    //     }
    //   ),
    //   Animated.timing(
    //     this.rotateValue,
    //     {
    //       toValue: .4,
    //       duration: 1000,
    //       easing: Easing.cubic
    //     }
    //   ),
    //   Animated.timing(
    //     this.rotateValue,
    //     {
    //       toValue: .5,
    //       duration: 1000,
    //       easing: Easing.cubic
    //     }
    //   ),
    //   Animated.timing(
    //     this.rotateValue,
    //     {
    //       toValue: .6,
    //       duration: 1000,
    //       easing: Easing.cubic
    //     }
    //   ),
    //   Animated.timing(this.rotateValue, { toValue: .7, duration: 1000, easing: Easing.cubic }),
    //   Animated.timing(this.rotateValue, { toValue: .8, duration: 1000, easing: Easing.cubic }),
    //   Animated.timing(this.rotateValue, { toValue: .9, duration: 1000, easing: Easing.cubic }),
    //   Animated.timing(this.rotateValue, { toValue: 1, duration: 1000, easing: Easing.cubic }),
    //   Animated.timing(this.rotateValue, { toValue: 1.1, duration: 1000, easing: Easing.cubic }),
    //   Animated.timing(this.rotateValue, { toValue: 1.2, duration: 1000, easing: Easing.cubic }),
    //
    //
    //
    //
    // ]).start();
  // }


  render() {

    // const rotationProp = rotateValue.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: ['0deg', '30deg']
    // });

    return (
      <View style={styles.container}>
        <DoubleHexView
          rotationInterpolation={this.props.rotationInterpolation}/>
        <View style={{top: -200}}>
          <Text style={{fontSize: 35, color: '#8f8f8f'}}>{this.props.seconds}</Text>
        </View>
        {/* <Animated.View style={[styles.rotatingContainer, {transform: [{rotate: rotation}]}]}> */}
          {/* <View style={styles.rect}></View>
          <View style={[styles.rect, styles.two]}></View>
          <View style={[styles.rect, styles.three]}></View> */}
        {/* </Animated.View> */}
          {/* <View style={[styles.rect, styles.four]}></View>
          <View style={[styles.rect, styles.five]}></View>
          <View style={[styles.rect, styles.six]}></View> */}
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
