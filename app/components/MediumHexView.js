import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';

export default class MediumHexView extends Component {
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
    width: 43.3,
    height: 50,
    // margin: 15
  },
  hexagonInner: {
    width: 42.3,
    height: 25,
    // backgroundColor: this.props.color
  },
  hexagonBefore: {
    position: 'absolute',
    top: -12.5,
    left: 0,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 21.65,
    borderLeftColor: 'transparent',
    borderRightWidth: 21.65,
    borderRightColor: 'transparent',
    borderBottomWidth: 12.25,
    // borderBottomColor: this.props.color
  },
  hexagonAfter: {
    position: 'absolute',
    bottom: 13,
    left: 0,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 21.65,
    borderLeftColor: 'transparent',
    borderRightWidth: 21.65,
    borderRightColor: 'transparent',
    borderTopWidth: 12.25,
    // borderTopColor: this.props.color
  }
});
