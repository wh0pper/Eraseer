
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';


export default class HexView extends Component {
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
    width: 75,
    height: 41.25,
    margin: 20
  },
  hexagonInner: {
    width: 75,
    height: 41.25,
    // backgroundColor: this.props.color
  },
  hexagonBefore: {
    position: 'absolute',
    top: -18.75,
    left: 0,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 37.5,
    borderLeftColor: 'transparent',
    borderRightWidth: 37.5,
    borderRightColor: 'transparent',
    borderBottomWidth: 18.75,
    // borderBottomColor: this.props.color
  },
  hexagonAfter: {
    position: 'absolute',
    bottom: -18.50,
    left: 0,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 37.5,
    borderLeftColor: 'transparent',
    borderRightWidth: 37.5,
    borderRightColor: 'transparent',
    borderTopWidth: 18.75,
    // borderTopColor: this.props.color
  }
});
