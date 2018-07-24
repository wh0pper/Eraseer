
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';


export default class Box extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <View style={[styles.container, {backgroundColor: this.props.boxInfo.color}]}>
        <Text>{this.props.boxInfo.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    marginBottom: 10
  }
});
