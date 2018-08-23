import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';

export default class SmallHexView extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {
  }

  render() {

    return (
      <View style={[styles.hexagon]}>
        <View style={[styles.hexagonInner, {backgroundColor: this.props.color}]} />
        <View style={[styles.hexagonBefore, {borderBottomColor: this.props.color}]} />
        <View style={[styles.hexagonAfter, {borderTopColor: this.props.color}]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hexagon: {
    width: 26,
    height: 30,
    margin: 15
  },
  hexagonInner: {
    width: 26,
    height: 15,
    // backgroundColor: this.props.color
  },
  hexagonBefore: {
    position: 'absolute',
    top: -7.5,
    left: 0,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 13,
    borderLeftColor: 'transparent',
    borderRightWidth: 13,
    borderRightColor: 'transparent',
    borderBottomWidth: 7.5,
    // borderBottomColor: this.props.color
  },
  hexagonAfter: {
    position: 'absolute',
    bottom: 7.5,
    left: 0,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 13,
    borderLeftColor: 'transparent',
    borderRightWidth: 13,
    borderRightColor: 'transparent',
    borderTopWidth: 7.5,
    // borderTopColor: this.props.color
  }
});
