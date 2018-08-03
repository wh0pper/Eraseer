import React, {Component} from 'react';
import {
  Platform,
  NativeAppEventEmitter,
  NativeModules,
  NativeEventEmitter,
  PermissionsAndroid
} from 'react-native';

import { createStackNavigator } from 'react-navigation';

import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';


import GameScreen from './app/screens/GameScreen';
import RegistrationScreen from './app/screens/RegistrationScreen';
import ScoreScreen from './app/screens/ScoreScreen';
import ScanScreen from './app/screens/ScanScreen';
import ClickListenScreen from './app/screens/ClickListenScreen';
import WarningScreen from './app/screens/WarningScreen';
import ConfirmScreen from './app/screens/ConfirmScreen';
import ClaimErrorScreen from './app/screens/ClaimErrorScreen';
import RemovePlayerScreen from './app/screens/RemovePlayerScreen';

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

    this.startScan(); //needs to be async, sleep to delay auto start of scan, otherwise just won't Work
    console.log('App mounted, scan state: ', this.state.isScanning);

  }

  componentWillUnmount() {
    this.discoveryHandler.remove();
    this.subscriptionHandler.remove();
    this.disconnectHandler.remove();
  }

  async startScan() {
    await sleep(1000);
    let newState = !this.state.isScanning;
    this.setState({isScanning: newState});
    if (newState) {
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
    } else {
      console.log('Stopping scan.')
      BleManager.stopScan();
    }
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
      BleManager.startNotification(peripheralId, ITAG_SERVICE, ITAG_CHARACTERISTIC)
      .then((results) => {console.log('Subscription started on peripheral with ID: ', peripheralId)})
      .catch((error) => {console.log('Error starting subscription for periph with ID: ', peripheralId, error)})
    })
  }

  handleSubscription(data) {
    let recievedTime = Date.now();
    console.log('Subscription listener fired, received data from:' + data.peripheral, data);
    this.setState({
      lastClick: {
        peripheral: data.peripheral,
        time: recievedTime
      }
    })
  }

  handleDisconnect(data) {
    console.log('Peripheral initiated a disconnect: ', data);
  }


  render() {
    return (
      // <GestureRecognizer
      //   onSwipeRight={(state) => console.log('swipe right')}>

        <NavigationStack screenProps={{
          deviceList: this.state.subscribedDevices,
          startScan: () => this.startScan(),
          scanState: this.state.isScanning,
          lastClick: this.state.lastClick,
          stopScan: () => this.stopScan()
        }}/>
      // </GestureRecognizer>
    );
  }
}

const RegistrationStack = createStackNavigator({
  warning: WarningScreen,
  click: ClickListenScreen,
  confirm: ConfirmScreen,
  error: ClaimErrorScreen
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
    initialRouteName: 'score'
  }
);
