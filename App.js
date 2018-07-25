import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  NativeAppEventEmitter,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import PlayerBox from './app/components/PlayerBox';
import RegisterModal from './app/components/RegisterModal';

import BleManager from 'react-native-ble-manager';
const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

// const ITAG_SERVICE = "0000ffe0-0000-1000-8000-00805f9b34fb";
// const ITAG_CHARACTERISTIC = "0000ffe1-0000-1000-8000-00805f9b34fb";

const SCAN_TIME = 60;

const ITAG_SERVICE = "ffe0";
const ITAG_CHARACTERISTIC = "ffe1";

const colorBank = [
  {
    color: '#7C9132',
    isPopulated: false
  },
  {
    color: '#292929',
    isPopulated: false
  },
  {
    color: '#5386AD',
    isPopulated: false
  },
  {
    color: '#BCAC46',
    isPopulated: false
  },
  {
    color: '#673D91',
    isPopulated: false
  },
  {
    color: '#88241E',
    isPopulated: false
  }
];

let playerBank = [
  {
    name: 'Player 6',
    color: colorBank[5]
  },
  {
    name: 'Player 5',
    color: colorBank[4]
  },
  {
    name: 'Player 4',
    color: colorBank[3]
  },
  {
    name: 'Player 3',
    color: colorBank[2]
  },
  {
    name: 'Player 2',
    color: colorBank[1]
  },
  {
    name: 'Player 1',
    color: colorBank[0]
  }
];

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    BleManager.start({showAlert: true});

    super(props);

    this.state = {
      isScanning: false,
      playerList: [],
      registrationList: colorBank,
      playerCount: 0,
      roundCount: 0,
      registrationVisible: false
    };

    this.handleDiscovery = this.handleDiscovery.bind(this);
    this.handleSubscription = this.handleSubscription.bind(this);
    this.handleDisconnect = this.handleDisconnect.bind(this);
  }

  componentDidMount() {
    this.discoveryHandler = BleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscovery );
    this.subscriptionHandler = BleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleSubscription );
    this.disconnectHandler = BleManagerEmitter.addListener('BleManagerDisconnectPeripheral', this.handleDisconnect );
  }

  componentWillUnmount() {
    this.discoveryHandler.remove();
    this.subscriptionHandler.remove();
    this.disconnectHandler.remove();
  }

  startScan() {
    let newState = !this.state.isScanning;
    this.setState({isScanning: newState});
    if (newState) {
      BleManager.scan([],SCAN_TIME,false)
      .then(() => {
        setTimeout(() => {
          this.setState({isScanning: false});
        }, SCAN_TIME * 1000);
        console.log('Scan initialized');
      })
      .catch((error) => {
        console.log('Error initializing scan: ', error);
      });

    } else {
      BleManager.stopScan();
    }
  }

  handleDiscovery(peripheral) {
    // console.log('New device discovered: ', peripheral);
    let name = peripheral.name || '';
    if (this.state.playerList.length < 6) {
      if (name.toLowerCase().trim() == 'itag') {
        console.log('Initializing connection with found iTag device.')
        BleManager.connect(peripheral.id)
        .then(() => {
          console.log('Connected to new iTag with id: ', peripheral.id);
          let players = this.state.playerList;
          let nextColor = colorBank.pop();
          let newPlayer = {
            hasInfo: false,
            color: nextColor
          };
          // let newPlayer = playerBank.pop();
          // newPlayer.peripheralId = peripheral.id;
          // newPlayer.clickTime = null;
          players.push(newPlayer);
          this.setState({
            playerList: players,
          });
          this.subscribeToClick(peripheral.id);
        })
        .catch((error) => {
          console.log('Error connecting to new iTag: ', error);
        });
      }
    }
  }

  registerNewPlayer(selectedBox) {
    console.log('Registering new player');
    this.setState({registrationVisible: true});
    let registrations = this.state.registrationList;
    let regToUpdate = registrations.find((reg) => reg.color == selectedBox.color)
    let removeIndex = registrations.indexOf(regToUpdate);
    registrations.splice(removeIndex, 1);
    regToUpdate.name = 'name';
    registrations.splice(removeIndex, 0, regToUpdate);
    this.setState({registrationList: registrations});
  }

  subscribeToClick(peripheralId) {
    BleManager.retrieveServices(peripheralId).then((serviceData) => {
      BleManager.startNotification(peripheralId, ITAG_SERVICE, ITAG_CHARACTERISTIC)
      .then((results) => {console.log('Subscription started on peripheral with ID: ', peripheralId)})
      .catch((error) => {console.log('Error starting subscription for periph with ID: ', peripheralId, error)})
    })
  }

  handleSubscription(data) {
    let recievedTime = Date.now();
    console.log('Subscription listener fired, received data from:' + data.peripheral, data);
    let players = this.state.playerList;
    let updatePlayer = players.find((player, index) => player.peripheralId == data.peripheral);
    updatePlayer.clickTime = recievedTime;
    let updateIndex = players.indexOf(updatePlayer);
    players[updateIndex] = updatePlayer;
    this.setState({playerList: players});
  }

  handleDisconnect(data) {
    console.log('Peripheral initiated a disconnect: ', data);
    let players = this.state.playerList;
    let removePlayer = players.find((player) => player.peripheralId == data.peripheral);
    if (removePlayer) {
      console.log('Removing player from game: ', removePlayer);
      let removeIndex = players.indexOf(removePlayer);
      players.splice(removeIndex, 1);
      delete removePlayer.peripheralId;
      delete removePlayer.clickCount;
      playerBank.push(removePlayer);
      this.setState({playerList: players});
    } else {
      console.log('Error removing player from game');
    }
  }

  // startGame() {
  //
  // }

  hideRegistration() {
    let newValue = !this.state.registrationVisible;
    this.setState({ registrationVisible: newValue });
  }

  render() {

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => this.startGame()}><Text>Start Game</Text></TouchableOpacity>
        <FlatList
            data={this.state.registrationList}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              return (
                <View>
                  <TouchableOpacity onPress={() => this.registerNewPlayer(item)}>
                    <PlayerBox displayInfo={item}></PlayerBox>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        <TouchableOpacity style={styles.button} onPress={() => this.startScan()}><Text>{this.state.isScanning ? "Stop" : "Scan"}</Text></TouchableOpacity>
      <RegisterModal
        visible={this.state.registrationVisible}
        // hide={() => this.hideRegistration}
        ></RegisterModal>
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
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
