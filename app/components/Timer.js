
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';


export default class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      remaining: 10
    };
  }

  componentDidMount() {
    let timer = setInterval(() => {
      let newValue = this.state.remaining - 1;
      if (newValue >= 0) {
        this.setState({remaining: newValue});
      } else {
        clearInterval(timer);
        this.props.processRound();
        //determine winner
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(timer);
  }

  onComplete() {

  }

  render() {


    return (

        <View style={styles.container}>
          <Text style={{color: '#ff0000', fontSize: 30}}>{this.state.remaining}</Text>
        </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {

  }
});
