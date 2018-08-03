import React, {Component} from 'react';
import {
  Platform,
  NativeAppEventEmitter,
  NativeModules,
  NativeEventEmitter,
  PermissionsAndroid
} from 'react-native';

import EventEmitter from 'events';
import { createStackNavigator } from 'react-navigation';
import { stringToBytes } from 'convert-string';

import GameScreen from './app/screens/GameScreen';
import RegistrationScreen from './app/screens/RegistrationScreen';
import ScoreScreen from './app/screens/ScoreScreen';
import ScanScreen from './app/screens/ScanScreen';
import ClickListenScreen from './app/screens/ClickListenScreen';
import WarningScreen from './app/screens/WarningScreen';
import ConfirmScreen from './app/screens/ConfirmScreen';
import RemovePlayerScreen from './app/screens/RemovePlayerScreen';
import ClaimErrorScreen from './app/screens/ClaimErrorScreen';

import BleManager from 'react-native-ble-manager';
const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

// const ITAG_SERVICE = "0000ffe0-0000-1000-8000-00805f9b34fb";
// const ITAG_CHARACTERISTIC = "0000ffe1-0000-1000-8000-00805f9b34fb";

const SCAN_TIME = 60;

const ITAG_SERVICE = "ffe0";
const ITAG_CHARACTERISTIC = "ffe1";

async function sleep(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, time);
  });
}

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    BleManager.start({showAlert: true, forceLegacy: true});
    super(props);
    this.jsEventEmitter = new EventEmitter();

    this.state = {
      isScanning: false,
      subscribedDevices: [],
      lastClick: {
        peripheral: null,
        time: 0
      }

    };

    this.handleDiscovery = this.handleDiscovery.bind(this);
    this.handleSubscription = this.handleSubscription.bind(this);
    this.handleDisconnect = this.handleDisconnect.bind(this);
  }

  componentDidMount() {
    this.discoveryHandler = BleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscovery );
    this.subscriptionHandler = BleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleSubscription );
    this.disconnectHandler = BleManagerEmitter.addListener('BleManagerDisconnectPeripheral', this.handleDisconnect );

    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
        if (result) {
          console.log("Permission is OK");
        } else {
          PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
            if (result) {
              console.log("User accept");
            } else {
              console.log("User refuse");
            }
          });
        }
      });
    }

    this.startScan();
    console.log('App mounted, scan state: ', this.state.isScanning);

  }

  componentWillUnmount() {
    this.discoveryHandler.remove();
    this.subscriptionHandler.remove();
    this.disconnectHandler.remove();
  }

  async startScan() {
    await sleep(1000); //needs to be async, otherwise just won't Work
    // if (newState) {
    this.state.subscribedDevices.forEach((device) => {
      BleManager.disconnect(device);
    })
    this.setState({
      subscribedDevices: [],
      isScanning: true
    });
    BleManager.scan([],SCAN_TIME,false,{})
    .then(() => {
      setTimeout(() => {
        this.setState({isScanning: false});
      }, SCAN_TIME * 1000);
      console.log('Scan initialized');
    })
    .catch((error) => {
      console.log('Error initializing scan: ', error);
    });
    // } else {
    //   console.log('Stopping scan.')
    //   BleManager.stopScan();
    // }
  }

  stopScan() {
    BleManager.stopScan();
    this.setState({isScanning: false});
  }

  handleDiscovery(peripheral) {
    //console.log('Peripheral discovered');
    let name = peripheral.name || '';
    if (name.toLowerCase().trim() == 'itag') {
      console.log('New iTag discovered: ', peripheral);
      console.log('Initializing connection with found iTag device.')
      BleManager.connect(peripheral.id)
      .then(() => {
        console.log('Connected to new iTag with id: ', peripheral.id);

        let existingDevices = this.state.subscribedDevices;
        if (!existingDevices.includes(peripheral.id)) {
          existingDevices.push(peripheral.id)
        }
        this.setState({subscribedDevices: existingDevices});
        this.subscribeToClick(peripheral.id);
      })
      .catch((error) => {
        console.log('Error connecting to new iTag: ', error);
      });
    }
  }

  subscribeToClick(peripheralId) {
    BleManager.retrieveServices(peripheralId).then((serviceData) => {
      console.log('serviceData', serviceData);
      BleManager.startNotification(peripheralId, ITAG_SERVICE, ITAG_CHARACTERISTIC)
      .then((results) => {console.log('Subscription started on peripheral with ID: ', peripheralId)})
      .catch((error) => {console.log('Error starting subscription for periph with ID: ', peripheralId, error)})
    })
  }

  handleSubscription(data) {
    let receivedTime = Date.now();
    console.log('Subscription listener fired, received data from:' + data.peripheral, data);
    this.jsEventEmitter.emit('clickReceived', {peripheral: data.peripheral, time: receivedTime});
    this.setState({
      lastClick: {
        peripheral: data.peripheral,
        time: receivedTime
      }
    })
  }

  handleDisconnect(data) {
    console.log('Peripheral initiated a disconnect: ', data);
    // let serviceIdArray = data.peripheral.split('')
    // serviceIdArray.splice(4,1,'1').splice(5,1,'8').splice(6,1,'0').splice(7,1,'2');
    // let serviceId = serviceIdArray.join('');
    // console.log('service id:', serviceId);
    // BleManager.writeWithoutResponse(data.peripheral, serviceId, "2A06", stringToBytes('00'))
    //   .then(console.log('wrote to disable itag alarm'))
    //   .catch((e) => console.log('error disabling itag alarm', e));
    let updatedDevices = this.state.subscribedDevices
    let updateIndex = updatedDevices.indexOf(data.peripheral);
    updatedDevices.splice(updateIndex, 1);
    this.setState({subscribedDevices: updatedDevices})
  }


  render() {
    return (
        <NavigationStack screenProps={{
          jsEventEmitter: this.jsEventEmitter,
          deviceList: this.state.subscribedDevices,
          startScan: () => this.startScan(),
          scanState: this.state.isScanning,
          lastClick: this.state.lastClick,
          stopScan: () => this.stopScan()
        }}/>
    );
  }
}

const RegistrationStack = createStackNavigator({
  warning: WarningScreen,
  click: ClickListenScreen,
  confirm: ConfirmScreen,
  error: ClaimErrorScreen,
  },
  {
    mode: 'modal',
    headerMode: 'none',
    initialRouteName: 'warning'
  }
);

const NavigationStack = createStackNavigator({
    scan: ScanScreen,
    registration: RegistrationScreen,
    clickStack: RegistrationStack,
    game: GameScreen,
    remove: RemovePlayerScreen,
    score: ScoreScreen,
  },
  {
    headerMode: 'none',
    gesturesEnabled: true,
    initialRouteName: 'game'
  }
);
