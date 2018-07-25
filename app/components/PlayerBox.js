
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';


export default class PlayerBox extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {
    console.log('Props passed to box: ', this.props.playerInfo);
  }

  render() {
    // if (this.props.playerInfo.hasInfo) {
    //   content = (
    //     <View style={[styles.container, {backgroundColor: this.props.color}]}>
    //       <Text>{this.props.playerInfo.name}</Text>
    //       {/* <Text>Clicks: {this.props.playerInfo.clickCount}</Text>
    //       <Text>Peripheral ID: {this.props.playerInfo.peripheralId}</Text> */}
    //     </View>
    //   )
    // } else {
      // content =
      //   <View style={[styles.container, {backgroundColor: this.props.color}]}>
      //     <Text>Claim</Text>
      //   </View>
    // }

    return (

        // {content}
        <View style={[styles.container, {backgroundColor: this.props.displayInfo.color}]}>
          <Text>{this.props.displayInfo.name || 'Claim'}</Text>
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
