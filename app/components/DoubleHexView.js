
import React, {Component} from 'react';
import {Animated, Easing, Platform, StyleSheet, View} from 'react-native';

export default class DoubleHexView extends Component {
  constructor(props) {
    super(props);
    // this.rotateValue = new Animated.Value(0);
    this.state = {

    };
  }

  // startRotation() {
  //   // Animated.sequence([
  //   //   Animated.timing(
  //   //     this.rotateValue,
  //   //     {
  //   //       toValue: .1,
  //   //       duration: 1000,
  //   //       easing: Easing.cubic
  //   //     }
  //   //   ),
  //   //   Animated.timing(
  //   //     this.rotateValue,
  //   //     {
  //   //       toValue: .2,
  //   //       duration: 1000,
  //   //       easing: Easing.cubic
  //   //     }
  //   //   ),
  //   //   Animated.timing(
  //   //     this.rotateValue,
  //   //     {
  //   //       toValue: .3,
  //   //       duration: 1000,
  //   //       easing: Easing.cubic
  //   //     }
  //   //   ),
  //   //   Animated.timing(
  //   //     this.rotateValue,
  //   //     {
  //   //       toValue: .4,
  //   //       duration: 1000,
  //   //       easing: Easing.cubic
  //   //     }
  //   //   ),
  //   //   Animated.timing(
  //   //     this.rotateValue,
  //   //     {
  //   //       toValue: .5,
  //   //       duration: 1000,
  //   //       easing: Easing.cubic
  //   //     }
  //   //   ),
  //   //   Animated.timing(
  //   //     this.rotateValue,
  //   //     {
  //   //       toValue: .6,
  //   //       duration: 1000,
  //   //       easing: Easing.cubic
  //   //     }
  //   //   ),
  //   //   Animated.timing(this.rotateValue, { toValue: .7, duration: 1000, easing: Easing.cubic }),
  //   //   Animated.timing(this.rotateValue, { toValue: .8, duration: 1000, easing: Easing.cubic }),
  //   //   Animated.timing(this.rotateValue, { toValue: .9, duration: 1000, easing: Easing.cubic }),
  //   //   Animated.timing(this.rotateValue, { toValue: 1, duration: 1000, easing: Easing.cubic }),
  //   //   Animated.timing(this.rotateValue, { toValue: 1.1, duration: 1000, easing: Easing.cubic }),
  //   //   Animated.timing(this.rotateValue, { toValue: 1.2, duration: 1000, easing: Easing.cubic }),
  //   //
  //   //
  //   //
  //   //
  //   // ]).start();
  // }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.rotatingContainer}>
          <View style={styles.rect}></View>
          <View style={[styles.rect, styles.two]}></View>
          <View style={[styles.rect, styles.three]}></View>
        </View>
          <View style={[styles.rect, styles.four]}></View>
          <View style={[styles.rect, styles.five]}></View>
          <View style={[styles.rect, styles.six]}></View>
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
