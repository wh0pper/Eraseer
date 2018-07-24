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
import Box from './box';

import BleManager from 'react-native-ble-manager';
const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const ITAG_SERVICE = "0000ffe0-0000-1000-8000-00805f9b34fb";
const ITAG_CHARACTERISTIC = "0000ffe1-0000-1000-8000-00805f9b34fb";

let colorBank = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];

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
      boxList: []
    };

    this.handleDiscovery = this.handleDiscovery.bind(this);
    this.handleSubscription = this.handleSubscription.bind(this);
  }

  componentDidMount() {
    this.discoveryHandler = BleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscovery );
    this.subscriptionHandler = BleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleSubscription );
  }

  componentWillUnmount() {
    this.discoveryHandler.remove();
    this.subscriptionHandler.remove();
  }

  startScan() {
    let newState = !this.state.isScanning;
    this.setState({isScanning: newState});
    if (newState) {
      BleManager.scan([],120,false)
      .then(() => {
        console.log('Scan initialized');
      })
      .catch((error) => {
        console.log('Error initializing scan: ', error);
      })
    } else {
      BleManager.stopScan();
    }
  }

  subscribeToClick(peripheralId) {
    BleManager.retrieveServices(peripheralId).then((serviceData) => {
      BleManager.startNotification(peripheralId, ITAG_SERVICE, ITAG_CHARACTERISTIC)
      .then((results) => {console.log('Subscription started on peripheral with ID: ', peripheralId)})
      .catch((error) => {console.log('Error starting subscription for periph with ID: ', peripheralId)})
    })
  }

  handleDiscovery(peripheral) {
    console.log('New device discovered: ', peripheral);
    let name = peripheral.name || '';
    if (this.state.boxList.length < 6) {
      if (name.toLowerCase().trim() == 'itag') {
        BleManager.connect(peripheral.id)
        .then(() => {
          console.log('Connected to new iTag with id: ', peripheral.id);
          let players = this.state.boxList;
          players.push(playerBank.pop());
          this.setState({boxList: players});
          this.subscribeToClick(peripheral.id);
        })
        .catch((error) => {
          console.log('Error connecting to new iTag: ', error);
        });
      }
    }
  }

  handleSubscription() {
    console.log('Subscription listener fired');
  }


  render() {

    return (
      <View style={styles.container}>
        <FlatList
            data={this.state.boxList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              return (
                <Box boxInfo={item}></Box>
                // <TouchableHighlight onPress={() => this.connect(item) }>
                //   <View style={[styles.row]}>
                //     <Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 10}}>{item.name}</Text>
                //     <Text style={{fontSize: 8, textAlign: 'center', color: '#333333', padding: 10}}>{item.id}</Text>
                //   </View>
                // </TouchableHighlight>
              );
            }}
          />
        <TouchableOpacity style={styles.button} onPress={() => this.startScan()}><Text>{this.state.isScanning ? "Stop" : "Scan"}</Text></TouchableOpacity>
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
