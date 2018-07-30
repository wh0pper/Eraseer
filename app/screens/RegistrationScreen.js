import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import RegisterModal from '../components/RegisterModal';
import PlayerBox from '../components/PlayerBox';
import RealmHex from '../components/RealmHex';

function sleep(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, time);
  });
}

const realms = [
  {
    name: 'Deceit',
    color: '#7C9132',
    isPopulated: false,
    peripheralId: null,
    position: {left: 40, top: 10}
  },
  {
    name: 'Despair',
    color: '#292929',
    isPopulated: false,
    peripheralId: null,
    position: {left: 70, top: 30}
  },
  {
    name: 'Indifference',
    color: '#5386AD',
    isPopulated: false,
    peripheralId: null,
    position: {left: 70, top: 60}
  },
  {
    name: 'Indulgence',
    color: '#BCAC46',
    isPopulated: false,
    peripheralId: null,
    position: {left: 40, top: 70}
  },
  {
    name: 'Arrogance',
    color: '#673D91',
    isPopulated: false,
    peripheralId: null,
    position: {left: 0, top: 60}
  },
  {
    name: 'Anger',
    color: '#88241E',
    isPopulated: false,
    peripheralId: null,
    position: {left: 0, top: 30}
  }
];

export default class RegistrationScreen extends Component {
  constructor(props) {

    super(props);

    this.state = {
      realms: realms.slice(),
      registrationVisible: false,
      clickDetected: false,
      playerList: [],
      availableDevices: this.props.screenProps.deviceList,
      realmBeingClaimed: {}
    };

  }

  componentDidMount() {
    //console.log('current screen passed to reg screen: ', this.props.screenProps.currentScreen);
  }

  async registerPlayer(selectedBox) {
    //console.log('Registering new player');
    let startTime = Date.now();
    this.setState({
      registrationVisible: true,
      realmBeingClaimed: selectedBox
    });
    //delay to allow modal to render
    // await sleep(1000);

    let peripheralId = await this.listenForClick(startTime).catch((e) => {});//console.log(e));
    let newPlayer = {
      name: selectedBox.name,
      color: selectedBox.color,
      peripheralId: this.props.screenProps.lastClick.peripheral,
      click: 0
    }

    let playerList = this.state.playerList;
    playerList.push(newPlayer);
    this.setState({
      registrationVisible: false,
      playerList: playerList
    });
    //console.log('Finished registering, updated Player list: ', this.state.playerList);
  }

  async listenForClick(startTime) {
    //console.log('Listening for registration click w startTime: ', startTime);
    return new Promise((resolve, reject) => {
      let listening = setInterval(() => {
        // need to refactor here to end interval when we've moved on, console log shows
        // //console.log('Still listening, last clickTime: ', this.props.screenProps.lastClick.time)
        if (this.props.screenProps.lastClick.time > startTime) {
          this.setState({clickDetected: true});
          resolve(this.props.screenProps.lastClick.peripheral);
        }
      }, 100);
      setTimeout(() => {
        clearInterval(listening);
        reject('No click detected')
      }, 10000);
    })

  }

  handleClick() {
    //console.log('click in registration')
  }

  startGame() {
    // //console.log('playerlist on game start: ', this.state.playerList)
  }

  hideRegistration() {
    // let newValue = !this.state.registrationVisible;
    this.setState({
      registrationVisible: false,
      clickDetected: false
    });

  }

  render() {

    return (
      <View style={styles.container}>
        {/* <TouchableOpacity style={styles.button} onPress={() => this.props.screenProps.startScan()}>
          <Text>{this.state.isScanning ? "Stop" : "Scan"}</Text>
        </TouchableOpacity> */}
        <View style={styles.title}>
          <Text>DOMINIONS</Text>
        </View>
        <View style={styles.realmContainer}>
          <RealmHex currentScreen={this.props.screenProps.currentScreen} registerPlayer={(realmInfo) => this.registerPlayer(realmInfo)}/>
          {/* <FlatList
              data={this.state.realms}
              extraData={this.state}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => {
                return (
                  <View>
                    <TouchableOpacity onPress={() => this.registerPlayer(item)}>
                      <PlayerBox currentScreen={this.props.screenProps.currentScreen} displayInfo={item}></PlayerBox>
                    </TouchableOpacity>
                  </View>
                );
              }}
            /> */}
          </View>
            <Text>Tap to select your domain.</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.startGame();
              this.props.navigation.navigate('game', {players: this.state.playerList});
              }
            }>
            <Text>Start Game</Text>
          </TouchableOpacity>
          {/* <Text>Swipe right to start.</Text>
          <Text>Swipe left to re-start.</Text> */}
          <RegisterModal
            visible={this.state.registrationVisible}
            hide={() => this.hideRegistration()}
            realm={this.state.realmBeingClaimed}
            clickDetected={this.state.clickDetected}
          />
      </View>
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
