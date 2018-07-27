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

import { createStackNavigator } from 'react-navigation';

import BleManager from 'react-native-ble-manager';
const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

// const ITAG_SERVICE = "0000ffe0-0000-1000-8000-00805f9b34fb";
// const ITAG_CHARACTERISTIC = "0000ffe1-0000-1000-8000-00805f9b34fb";

const SCAN_TIME = 60;

const ITAG_SERVICE = "ffe0";
const ITAG_CHARACTERISTIC = "ffe1";


export default class BluetoothContainer extends Component {
  constructor(props) {
    BleManager.start({showAlert: true});

    super(props);

    this.state = {
      isScanning: false,
      availableDevices: []
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
          let existingDevices = this.state.availableDevices;
          if (!existingDevices.includes(periperal.id)) {
            existingDevices.push(peripheral.id)
          }
          this.setState({availableDevices: existingDevices});
          this.subscribeToClick(peripheral.id);
        })
        .catch((error) => {
          console.log('Error connecting to new iTag: ', error);
        });
      }
    }
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
    // let players = this.state.playerList;
    // let updatePlayer = players.find((player, index) => player.peripheralId == data.peripheral);
    // updatePlayer.clickTime = recievedTime;
    // let updateIndex = players.indexOf(updatePlayer);
    // players[updateIndex] = updatePlayer;
    // this.setState({playerList: players});
  }

  handleDisconnect(data) {
    console.log('Peripheral initiated a disconnect: ', data);
    // let players = this.state.playerList;
    // let removePlayer = players.find((player) => player.peripheralId == data.peripheral);
    // if (removePlayer) {
    //   console.log('Removing player from game: ', removePlayer);
    //   let removeIndex = players.indexOf(removePlayer);
    //   players.splice(removeIndex, 1);
    //   delete removePlayer.peripheralId;
    //   delete removePlayer.clickCount;
    //   playerBank.push(removePlayer);
    //   this.setState({playerList: players});
    // } else {
    //   console.log('Error removing player from game');
    // }
  }

  render() {

    return (
      // <View style={styles.container}>

      // </View>
    );
  }
}

// const NavigationStack = createStackNavigator({
//     registration: {
//         screen: RegistrationScreen,
//         navigationOptions: () => ({
//           header: null,
//         }),
//       },
//     game: {
//       screen: GameScreen,
//       navigationOptions: () => ({
//         header: null,
//       }),
//     },
//     score: {
//       screen: ScoreScreen,
//       navigationOptions: () => ({
//         header: null,
//       }),
//     }
//   },
//   {
//     initialRouteName: 'registration'
//   }
// );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20
  }
});
