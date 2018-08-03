import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import CustomText from '../components/CustomText';
import PlayerBox from '../components/PlayerBox';
import DoubleHexView from '../components/DoubleHexView';

async function sleep(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, time);
  });
}

export default class RemovePlayerScreen extends Component {
  constructor(props) {

    super(props);

    this.state = {
      playerList: []
    };

  }

  componentDidMount() {
    this.setState({
      playerList: this.props.navigation.getParam('players'),
      removedPlayer: this.props.navigation.getParam('removedPlayer', {})
    });

  }

  nextScreen() {
    let remainingPlayers = this.state.playerList.filter((p) => p.isAlive);
    if (remainingPlayers.length == 1) {
      this.props.navigation.navigate('score', {players: this.state.playerList});
    } else {
      this.props.navigation.navigate('game', {timeRemaining: 10});
    }
  }

  render() {
    let removedPlayer = this.props.navigation.getParam('removedPlayer');
    let type = typeof removedPlayer;

    const gestureConfig = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
      <GestureRecognizer
        config={gestureConfig}
        onSwipeUp={(state)=> this.nextScreen()}
        style={{flex: 1}}
        >
      <View style={styles.container}>
        <View style={styles.title}>
          { (type != 'undefined') ?
            <CustomText>THE WORLD OF {removedPlayer.name} HAS BEEN FORGOTTEN</CustomText>
            :
            <CustomText>NO PLAYER ELIMINATED</CustomText> }
        </View>
        <View style={styles.playerBoxContainer}>
          { (type != 'undefined') ?
          <PlayerBox displayInfo={removedPlayer}></PlayerBox>
          :
          <View style={styles.emptyHexContainer}>
            <View style={styles.outerRectOne}></View>
            <View style={[styles.outerRectOne, styles.outerRectTwo]}></View>
            <View style={[styles.outerRectOne, styles.outerRectThree]}></View>
          </View>
          }
        </View>
        <DoubleHexView/>
        <View style={styles.button}>
          <CustomText>SWIPE UP TO CONTINUE</CustomText>
          {/* <TouchableOpacity
            onPress={() => this.nextScreen()}>
            <CustomText>Continue</CustomText>
          </TouchableOpacity> */}
        </View>
      </View>
    </GestureRecognizer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DFDFDF',
    // padding: 20
  },
  title: {
    top: 100
  },
  button: {
    bottom: 100
  },
  playerBoxContainer: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 40
  },
  emptyHexContainer: {
    width: 69.3,
    height: 80,
    margin: 20,
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center'
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
  }
});
