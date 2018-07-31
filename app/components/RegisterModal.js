import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Animated
} from 'react-native';

export default class RegisterModal extends Component {
  constructor(props) {
    super(props);
    this.animatedColor = new Animated.Value(0);
    this.animatedText = new Animated.Value(0);
    this.state = {

    };
  }

  componentDidMount() {
    console.log('modal did mount');
  }

  makeBlack() {
      // this.animatedColor.setValue(0);
      Animated.parallel([
        Animated.timing(
          this.animatedColor,
          {
            toValue: 1,
            duration: 1000
          }
        ),
        Animated.timing(
          this.animatedText,
          {
            toValue: 1,
            duration: 1000
          }
        ),
      ]).start();
  }

  render() {
    let backgroundColor = '#DFDFDF';
    let textColor = '#000000';
    if (this.props.clickDetected) {
      backgroundColor = this.animatedColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(223, 223, 223, 1.0)', 'rgba(0, 0, 0, 1.0)']
      });
      textColor = this.animatedText.interpolate({
        inputRange: [0, 1],
        outputRange: ['#000000', '#ffffff']
      });
    }

    return (
      <View>
        <Modal
          visible={this.props.visible}
          onRequestClose={() => null}>
          <Animated.View style={[styles.container, {backgroundColor: backgroundColor}]}>
            <Animated.Text style={[styles.text, {color: textColor}]}>{`YOU ARE CLAIMING\n THE WORLD OF ${this.props.realm.name}`}</Animated.Text>
            <Animated.Text style={[styles.text, {color: textColor}]}>{`TAP YOUR RUNE AND THE WORLD WILL\n TURN BLACK WHEN READY.`}</Animated.Text>
            <TouchableHighlight
              onPress={() => {
                this.props.hide()
              }}>
              <Animated.Text style={{color: textColor}}>close</Animated.Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {
                this.makeBlack()
              }}>
              <Text>make black</Text>
            </TouchableHighlight>
          </Animated.View>
        </Modal>
      </View>
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
    fontSize: 18,
    textAlign: 'center'
  }
});
