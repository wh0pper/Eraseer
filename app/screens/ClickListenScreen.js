import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Animated,
  Image,
  NativeEventEmitter
} from 'react-native';

import CustomText from '../components/CustomText';

async function sleep(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, time);
  });
}

export default class ClickListenScreen extends Component {
  constructor(props) {
    super(props);
    this.animatedColor = new Animated.Value(0);
    this.animatedText = new Animated.Value(0);
    this.state = {
      isClaimed: false
    };
  }

  componentDidMount() {
    this.confirmationListener = this.props.screenProps.jsEventEmitter.addListener('registrationConfirmed', this.makeBlack.bind(this));
    console.log('click listen did mount');
    this.listenTimeout = setTimeout(() => {
      console.log('click listen timeout');
      this.props.navigation.navigate('error');
    }, 7500);
  }

  componentWillUnmount() {
    console.log('click listen screen will unmount');
    // this.confirmationListener.remove();

  }

  async makeBlack() {
    clearTimeout(this.listenTimeout);
    this.setState({isClaimed: true});
    console.log('click confirmed for registration');
      // this.animatedColor.setValue(0);
      // Animated.parallel([
        Animated.timing(
          this.animatedColor,
          {
            toValue: 1,
            duration: 2000
          }
        ).start();
        await sleep(2000);
        this.props.navigation.navigate('registration');
      //   Animated.timing(
      //     this.animatedText,
      //     {
      //       toValue: 1,
      //       duration: 1000
      //     }
      //   ),
      // ]).start();

  }

  render() {
    // console.log('click detected in modal: ', this.props.navigation.getParam('clickDetected');
    let backgroundColor = this.animatedColor.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(223, 223, 223, 1.0)', 'rgba(0, 0, 0, 1.0)']
    });
    let textColor = '#7f7f7f';//this.animatedText.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: ['#7f7f7f', '#ffffff']
    // });


    return (
      <Animated.View style={[styles.container, {backgroundColor: backgroundColor}]}>
        {!this.state.isClaimed ?
        <View style={styles.container}>
          <Animated.Text style={[styles.text, {color: textColor}]}>{`YOU ARE CLAIMING\n THE WORLD OF ${this.props.navigation.getParam('realm').name}`}</Animated.Text>
          <Image
            source={require('../../rune.png')}></Image>
            <Animated.Text style={[styles.text, {color: textColor}]}>{`TAP YOUR RUNE TO CLAIM.`}</Animated.Text>
        </View>
          :
        <View style={styles.container}>
          <Image
            source={require('../../rune.png')}></Image>
          <Text style={[styles.text, {color: textColor}]}>{`OVERSEER, YOU HAVE CLAIMED THE WORLD OF ${this.props.navigation.getParam('realm').name}`}</Text>
        </View>
        }
      </Animated.View>
    )

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    // backgroundColor: '#DFDFDF',

  },
  text: {
    fontSize: 20,
    color: '#7f7f7f',
    textAlign: 'center'
  }
});
