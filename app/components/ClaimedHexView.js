
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';


export default class ClaimedHexView extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {
  }

  render() {




    return (
      <View style={styles.container}>
        <View style={styles.outerRectOne}></View>
        <View style={[styles.outerRectOne, styles.outerRectTwo]}></View>
        <View style={[styles.outerRectOne, styles.outerRectThree]}></View>
        <View style={[styles.innerHex]}>
          <View style={[styles.innerHexRect, {backgroundColor: this.props.color}]} />
          <View style={[styles.innerHexTop, {borderBottomColor: this.props.color}]} />
          <View style={[styles.innerHexBottom, {borderTopColor: this.props.color}]} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 69.3,
    height: 80,
    margin: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  outerRectOne: {
    position: 'absolute',
    width: 69.28,
    height: 40,
    borderStyle: 'solid',
    borderRightColor: 'darkgrey',
    borderRightWidth: 1,
    borderLeftColor: 'darkgrey',
    borderLeftWidth: 1,
  },
  outerRectTwo: {
    transform: [
      { rotate: '-60deg' }
    ]
  },
  outerRectThree: {
    transform: [
      { rotate: '60deg' }
    ]
  },
  innerHex: {
    // width: 20.79,
    // height: 24,
    // margin: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  innerHexRect: {
    // position: 'relative',
    width: 20.79,
    height: 12,
    // backgroundColor: this.props.color
  },
  innerHexTop: {
    position: 'absolute',
    top: -6,
    left: 0,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 10.39,
    borderLeftColor: 'transparent',
    borderRightWidth: 10.39,
    borderRightColor: 'transparent',
    borderBottomWidth: 6,
    // borderBottomColor: this.props.color
  },
  innerHexBottom: {
    position: 'absolute',
    bottom: -6,
    left: 0,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 10.39,
    borderLeftColor: 'transparent',
    borderRightWidth: 10.39,
    borderRightColor: 'transparent',
    borderTopWidth: 6,
    // borderTopColor: this.props.color
  }
});
