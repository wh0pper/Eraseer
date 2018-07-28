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
    peripheralId: null
  },
  {
    name: 'Despair',
    color: '#292929',
    isPopulated: false,
    peripheralId: null
  },
  {
    name: 'Indifference',
    color: '#5386AD',
    isPopulated: false,
    peripheralId: null
  },
  {
    name: 'Indulgence',
    color: '#BCAC46',
    isPopulated: false,
    peripheralId: null
  },
  {
    name: 'Arrogance',
    color: '#673D91',
    isPopulated: false,
    peripheralId: null
  },
  {
    name: 'Anger',
    color: '#88241E',
    isPopulated: false,
    peripheralId: null
  }
];

export default class RegistrationScreen extends Component {
  constructor(props) {

    super(props);

    this.state = {
      realms: realms.slice(),
      registrationVisible: false,
      playerList: [],
      availableDevices: this.props.screenProps.deviceList,
      realmBeingClaimed: {}
    };

  }

  componentDidMount() {

  }

  async registerPlayer(selectedBox) {
    console.log('Registering new player');
    let startTime = Date.now();
    this.setState({
      registrationVisible: true,
      realmBeingClaimed: selectedBox
    });
    //delay to allow modal to render
    await sleep(1000);
    let peripheralId = await this.listenForClick(startTime).catch((e) => console.log(e));
    let newPlayer = {
      name: selectedBox.name,
      color: selectedBox.color,
      peripheralId: this.props.screenProps.lastClick.peripheral
    }
    //update info for rendering
    // let registrations = this.state.realms;
    // let regToUpdate = registrations.find((reg) => reg.color == selectedBox.color);
    // let removeIndex = registrations.indexOf(regToUpdate);
    // console.log('updating registration for: ', regToUpdate);
    // registrations.splice(removeIndex, 1);
    // regToUpdate.color = selectedBox.color;
    // regToUpdate.isPopulated = true;
    // regToUpdate.click = 0;
    // regToUpdate.points = 0;
    // registrations.splice(removeIndex, 0, regToUpdate);
    //also add this player to playerlist
    // let players = this.state.playerList;
    //let playerList = registrations.filter((realm) => realm.isPopulated == true);
    let playerList = this.state.playerList;
    playerList.push(newPlayer);
    this.setState({
      registrationVisible: false,
      playerList: playerList
    });
    console.log('Finished registering, updated Player list: ', this.state.playerList);
  }

  async listenForClick(startTime) {
    console.log('Listening for registration click w startTime: ', startTime);
    return new Promise((resolve, reject) => {
      let listening = setInterval(() => {
        console.log('Still listening, last clickTime: ', this.props.screenProps.lastClick.time)
        if (this.props.screenProps.lastClick.time > startTime) {
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
    console.log('click in registration')
  }

  startGame() {
    // console.log('playerlist on game start: ', this.state.playerList)
  }

  hideRegistration() {
    // let newValue = !this.state.registrationVisible;
    this.setState({ registrationVisible: false });
  }

  render() {
    console.log('available devices in registration: ', this.state.availableDevices);
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => this.props.screenProps.startScan()}>
          <Text>{this.state.isScanning ? "Stop" : "Scan"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
              this.startGame();
              this.props.navigation.navigate('game', {players: this.state.playerList});
            }
          }>
          <Text>Start Game</Text>
        </TouchableOpacity>
        <FlatList
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
          />
          <RegisterModal
            visible={this.state.registrationVisible}
            hide={() => this.hideRegistration()}
            realm={this.state.realmBeingClaimed}
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
    backgroundColor: '#F5FCFF',
    padding: 20
  },
  button: {
    backgroundColor: 'lightgray',
    padding: 10
  }
});
