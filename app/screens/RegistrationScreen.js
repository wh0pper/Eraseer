import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  NativeEventEmitter
} from 'react-native';

import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import CustomText from '../components/CustomText';
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
    this.state = {
      playerList: [],
      realmList: realms.slice(),
      availableDevices: this.props.screenProps.deviceList.slice(),
      lastClick: {peripheral: null, time: 0}
    };


  }

  componentDidMount() {
    console.log('Registration screen mounted, playerList, deviceList:', this.state.playerList, this.state.availableDevices);
    this.resetRegistration();
    // this.clickListener = this.props.screenProps.jsEventEmitter.addListener('clickReceived', this.handleReceivedClick.bind(this));
    this.focusListener = this.props.navigation.addListener('willFocus', this.componentWillFocus.bind(this));
    this.clickListener = this.props.screenProps.jsEventEmitter.addListener('clickReceived', this.handleReceivedClick.bind(this));

  }

  componentWillUnmount() {
    console.log('registration unmounting');
    // this.clickListener.remove(); jk can't remove, library is questionable
    // this.props.screenProps.jsEventEmitter.removeListener('clickReceived');
    this.props.screenProps.jsEventEmitter.removeAllListeners();
    this.focusListener.remove();
  }

  componentWillFocus() {
    console.log('registration screen focused');
  }

  handleReceivedClick(data) {
    console.log('Registration screen received click event');
    this.setState({lastClick: data});
    console.log(this.state.lastClick);
  }

  resetRegistration() {
    this.setState({
      playerList: [],
      availableDevices: this.props.screenProps.deviceList.slice()
    });
    let realms = this.state.realmList;
    realms.forEach((r) => r.isClaimed = false);
    this.setState({realmList: realms});
  }

  async registerPlayer(selectedBox) {
    //console.log('Registering new player');
    let startTime = Date.now();
    console.log('selected box: ', selectedBox);
    this.props.navigation.navigate('warning', {realm: selectedBox});
      // mode: 'modal'
    // });
    await sleep(2000);
    console.log('start listening for click');
    this.listenForClick(startTime)
      .then((clickData) => {
        console.log('listen for click then');
        this.markRealmClaimed(selectedBox);
        // this.props.navigation.navigate('confirm');
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
        if (this.state.lastClick.time > startTime && this.state.availableDevices.includes(this.props.screenProps.lastClick.peripheral)) { //also check for rune available
          // this.makeModalBlack();
          this.props.screenProps.jsEventEmitter.emit('registrationConfirmed');
          resolve(this.props.screenProps.lastClick);
        }
      }, 10);
      setTimeout(() => {
        clearInterval(this.listening);
        reject('No click detected')
      }, 7500);
    })

  }

  markRealmClaimed(realm) {
    let realmsArray = this.state.realmList;
    let updateIndex = realmsArray.indexOf(realm);
    realmsArray[updateIndex].isClaimed = true;
    this.setState({realmList: realmsArray});
    // this.makeModalBlack();
  }

  startGame() {
    this.props.screenProps.jsEventEmitter.removeAllListeners();
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

  backToScan() {
    console.log('right swipe');
    this.props.navigation.navigate('scan');
  }

  render() {
    const gestureConfig = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
      <GestureRecognizer
        config={gestureConfig}
        onSwipeDown={(state) => this.onSwipeDown(state)}
        onSwipeLeft={(state) => this.onSwipeLeft(state)}
        onSwipeRight={() => this.backToScan()}
        style={{flex: 1}} >
        <View style={styles.container}>
          {/* <TouchableOpacity style={styles.button} onPress={() => this.props.screenProps.startScan()}>
            <CustomText>{this.state.isScanning ? "Stop" : "Scan"}</CustomText>
          </TouchableOpacity> */}
          <View style={styles.title}>
            <CustomText>DOMINIONS</CustomText>
          </View>
          <View style={styles.realmContainer}>
            <RealmHex realms={this.state.realmList} registerPlayer={(realmInfo) => this.registerPlayer(realmInfo)}/>
          </View>
          <CustomText>TAP TO SELECT YOUR DOMINION</CustomText>
          <CustomText>SWIPE DOWN TO RESTART</CustomText>
          {(this.state.playerList.length > 1) ? <CustomText>SWIPE LEFT TO START GAME</CustomText> : null }
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
