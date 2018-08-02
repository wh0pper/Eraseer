
import React, {Component} from 'react';
import {Animated, Easing, Platform, StyleSheet, Text, View, Button} from 'react-native';


export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.rotateValue = new Animated.Value(0);
    this.state = {

    };
  }

  componentDidMount() {
    this.startRotation();
  }

  componentWillUnmount() {

  }

  startRotation() {
    // Animated.sequence([
    //   Animated.timing(
    //     this.rotateValue,
    //     {
    //       toValue: .1,
    //       duration: 1000,
    //       easing: Easing.cubic
    //     }
    //   ),
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
  }


  render() {

    const rotation = this.rotateValue.interpolate({
      inputRange: [0, 1.2],
      outputRange: ['0deg', '360deg']
    });

    return (
      <View style={styles.container}>
        <Text style={{color: '#ff0000', fontSize: 30}}>{this.props.seconds}</Text>
        <Animated.View style={[styles.rotatingContainer, {transform: [{rotate: rotation}]}]}>
          <View style={styles.rect}></View>
          <View style={[styles.rect, styles.two]}></View>
          <View style={[styles.rect, styles.three]}></View>
        </Animated.View>
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
    borderRightColor: 'black',
    borderRightWidth: 1,
    borderLeftColor: 'black',
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
