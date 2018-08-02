
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
      <View style={styles.container}>
        <View style={[styles.hexagon]}>
          <View style={[styles.hexagonInner, {backgroundColor: this.props.color}]} />
          <View style={[styles.hexagonBefore, {borderBottomColor: this.props.color}]} />
          <View style={[styles.hexagonAfter, {borderTopColor: this.props.color}]} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  hexagon: {
    width: 69.3,
    height: 80,
    // margin: 20
  },
  hexagonInner: {
    width: 69.3,
    height: 40,
    // backgroundColor: this.props.color
  },
  hexagonBefore: {
    position: 'absolute',
    top: -20,
    left: 0,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 34.64,
    borderLeftColor: 'transparent',
    borderRightWidth: 34.64,
    borderRightColor: 'transparent',
    borderBottomWidth: 20,
    // borderBottomColor: this.props.color
  },
  hexagonAfter: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 34.64,
    borderLeftColor: 'transparent',
    borderRightWidth: 34.64,
    borderRightColor: 'transparent',
    borderTopWidth: 20,
    // borderTopColor: this.props.color
  }
});
