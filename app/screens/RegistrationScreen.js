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



export default class RegistrationScreen extends Component {
  constructor(props) {

    super(props);

    this.state = {
      registrationVisible: false,
      clickDetected: false,
      playerList: [],
      availableDevices: this.props.screenProps.deviceList,
      realmBeingClaimed: {}
    };

  }

  componentDidMount() {
    console.log('Registration screen mounted, playerList:', this.state.playerList);

  }

  async registerPlayer(selectedBox) {
    //console.log('Registering new player');
    let startTime = Date.now();
    this.setState({
      registrationVisible: true,
      realmBeingClaimed: selectedBox
    });
    let peripheralId = await this.listenForClick(startTime).catch((e) => {});//console.log(e));
    let newPlayer = {
      name: selectedBox.name,
      color: selectedBox.color,
      peripheralId: this.props.screenProps.lastClick.peripheral,
      click: 0,
      points: 0,
      isAlive: true
    }
    let playerList = this.state.playerList;
    playerList.push(newPlayer);
    this.setState({
      registrationVisible: false,
      playerList: playerList
    });
    console.log('Finished registering, updated Player list: ', this.state.playerList);
  }

  async listenForClick(startTime) {
    //console.log('Listening for registration click w startTime: ', startTime);
    // this.listening;
    return new Promise((resolve, reject) => {
      this.listening = setInterval(() => {
        // need to refactor here to end interval when we've moved on, console log shows
        // //console.log('Still listening, last clickTime: ', this.props.screenProps.lastClick.time)
        if (this.props.screenProps.lastClick.time > startTime) {
          this.setState({clickDetected: true});
          resolve(this.props.screenProps.lastClick.peripheral);
        }
      }, 100);
      this.timeout = setTimeout(() => {
        clearInterval(this.listening);
        this.setState({registrationVisible: false})
        reject('No click detected')
      }, 10000);
    })

  }

  startGame() {
    this.props.screenProps.stopScan();
    this.props.navigation.navigate('game', {
      players: this.state.playerList,
      resetPlayers: this.resetPlayers.bind(this)
    });
  }

  hideRegistration() {
    // let newValue = !this.state.registrationVisible;
    clearInterval(this.listening);
    clearTimeout(this.timeout);
    this.setState({
      registrationVisible: false
    });

  }

  resetPlayers() {
    this.setState({playerList: []});
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
          <RealmHex registerPlayer={(realmInfo) => this.registerPlayer(realmInfo)}/>
          {/* <FlatList
              data={this.state.realms}
              extraData={this.state}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => {
                return (
                  <View>
                    <TouchableOpacity onPress={() => this.registerPlayer(item)}>
                      <PlayerBox displayInfo={item}></PlayerBox>
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
              }
            }>
            <Text>Start Game</Text>
          </TouchableOpacity>
          {/* <Text>Swipe right to start.</Text>
          <Text>Swipe left to re-start.</Text> */}
          {this.state.registrationVisible ?
            <RegisterModal
              visible={this.state.registrationVisible}
              hide={() => this.hideRegistration()}
              realm={this.state.realmBeingClaimed}
              clickDetected={this.state.clickDetected}
            /> : null}
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
