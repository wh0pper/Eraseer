import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated
} from 'react-native';

import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import PlayerBox from '../components/PlayerBox';
import RealmHex from '../components/RealmHex';

async function sleep(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, time);
  });
}

const realms = [
  {
    name: 'DECEIT',
    color: '#7C9132',
    isClaimed: false,
    peripheralId: null,
    position: {left: 40, top: 10}
  },
  {
    name: 'DESPAIR',
    color: '#292929',
    isClaimed: false,
    peripheralId: null,
    position: {left: 70, top: 30}
  },
  {
    name: 'INDIFFERENCE',
    color: '#5386AD',
    isClaimed: false,
    peripheralId: null,
    position: {left: 70, top: 60}
  },
  {
    name: 'INDULGENCE',
    color: '#BCAC46',
    isClaimed: false,
    peripheralId: null,
    position: {left: 40, top: 70}
  },
  {
    name: 'ARROGANCE',
    color: '#673D91',
    isClaimed: false,
    peripheralId: null,
    position: {left: 0, top: 60}
  },
  {
    name: 'ANGER',
    color: '#88241E',
    isClaimed: false,
    peripheralId: null,
    position: {left: 0, top: 30}
  }
];

export default class RegistrationScreen extends Component {
  constructor(props) {

    super(props);
    this.animatedModalColor = new Animated.Value(0);
    this.state = {
      playerList: [],
      realmList: realms.slice(),
      availableDevices: this.props.screenProps.deviceList,
    };

  }

  componentDidMount() {
    console.log('Registration screen mounted, playerList:', this.state.playerList);
    // this.setState({newGame: true});
    this.resetRegistration();
    this.props.navigation.addListener('willFocus', this.componentDidFocus);
  }

  resetRegistration() {
    this.setState({playerList: []});
    let realms = this.state.realmList;
    realms.forEach((r) => r.isClaimed = false);
    this.setState({realmList: realms});
  }

  componentDidFocus() {
    console.log('registration screen did focus');
  }

  async registerPlayer(selectedBox) {
    //console.log('Registering new player');
    let startTime = Date.now();
    console.log('selected box: ', selectedBox);
    this.props.navigation.navigate('warning', {realm: selectedBox});
      // mode: 'modal'
    // });
    await sleep(2000);
    this.listenForClick(startTime)
      .then((clickData) => {
        console.log('listen for click then');
        this.markRealmClaimed(selectedBox);
        this.props.navigation.navigate('confirm');
        let newPlayer = {
          name: selectedBox.name,
          color: selectedBox.color,
          peripheralId: clickData.peripheral,//this.props.screenProps.lastClick.peripheral,
          click: 0,
          points: 0,
          isAlive: true
        }
        let playerList = this.state.playerList;
        playerList.push(newPlayer);
        //remove that device from available devices list
        let availableDevices = this.state.availableDevices;
        availableDevices.splice(availableDevices.indexOf(this.props.screenProps.lastClick.peripheral),1);
        this.setState({
          playerList: playerList,
          availableDevices: availableDevices
        });
        console.log('Finished registering, updated Player and device lists: ', this.state.playerList, this.state.availableDevices);
      })
      .catch(() => {this.props.navigation.navigate('error')});//console.log(e));
  }

  async listenForClick(startTime) {
    console.log('Listening for registration click w startTime: ', startTime);
    // this.listening;
    return new Promise((resolve, reject) => {
      this.listening = setInterval(() => {
        // need to refactor here to end interval when we've moved on, console log shows
        // //console.log('Still listening, last clickTime: ', this.props.screenProps.lastClick.time)
        if (this.props.screenProps.lastClick.time > startTime) { //also check for rune available
          this.makeModalBlack();
          resolve(this.props.screenProps.lastClick);
        }
      }, 10);
      this.timeout = setTimeout(() => {
        clearInterval(this.listening);
        reject('No click detected')
      }, 10000);
    })

  }

  markRealmClaimed(realm) {
    let realmsArray = this.state.realmList;
    let updateIndex = realmsArray.indexOf(realm);
    realmsArray[updateIndex].isClaimed = true;
    this.setState({realmList: realmsArray});
  }

  startGame() {
    this.props.screenProps.stopScan();
    this.props.navigation.navigate('game', {
      players: this.state.playerList,
      // resetPlayers: this.resetPlayers.bind(this)
    });
  }

  hideRegistration() {
    clearInterval(this.listening);
    clearTimeout(this.timeout);
  }

  // makeModalWhite() {
  //   console.log('making modal white');
  //   Animated.timing(
  //     this.animatedModalColor,
  //     {
  //       toValue: 0,
  //       duration: 1
  //     }
  //   ).start();
  // }

  makeModalBlack() {
    // console.log('making modal black');
    Animated.timing(
      this.animatedModalColor,
      {
        toValue: 1,
        duration: 1000
      }
    ).start();
  }



  onSwipeDown() {
    console.log('down swipe');
    this.resetRegistration();
  }

  onSwipeLeft() {
    console.log('left swipe')
    if (this.state.playerList.length > 1) {
      this.startGame();
    }
  }

  render() {
    let modalBackgroundColor = this.animatedModalColor.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(223, 223, 223, 1.0)', 'rgba(0, 0, 0, 1.0)']
    });

    const gestureConfig = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
      <GestureRecognizer
        config={gestureConfig}
        onSwipeDown={(state) => this.onSwipeDown(state)}
        onSwipeLeft={(state) => this.onSwipeLeft(state)}
        style={{flex: 1}} >
        <View style={styles.container}>
          {/* <TouchableOpacity style={styles.button} onPress={() => this.props.screenProps.startScan()}>
            <Text>{this.state.isScanning ? "Stop" : "Scan"}</Text>
          </TouchableOpacity> */}
          <View style={styles.title}>
            <Text>DOMINIONS</Text>
          </View>
          <View style={styles.realmContainer}>
            <RealmHex realms={this.state.realmList} registerPlayer={(realmInfo) => this.registerPlayer(realmInfo)}/>
          </View>
          <Text>TAP TO SELECT YOUR DOMINION</Text>
          <Text>SWIPE DOWN TO RESTART</Text>
          {(this.state.playerList.length > 1) ? <Text>SWIPE LEFT TO START GAME</Text> : null }
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
    marginBottom: 100
  },
  button: {
    backgroundColor: 'lightgray',
    padding: 10
  },
  realmContainer: {
    width: 300,
    height: 300
  }
});
