
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import PlayerBox from './PlayerBox';

const realms = [
  {
    name: 'DECEIT',
    color: '#7C9132',
    isPopulated: false,
    peripheralId: null,
    position: {left: 40, top: 10}
  },
  {
    name: 'DESPAIR',
    color: '#292929',
    isPopulated: false,
    peripheralId: null,
    position: {left: 70, top: 30}
  },
  {
    name: 'INDIFFERENCE',
    color: '#5386AD',
    isPopulated: false,
    peripheralId: null,
    position: {left: 70, top: 60}
  },
  {
    name: 'INDULGENCE',
    color: '#BCAC46',
    isPopulated: false,
    peripheralId: null,
    position: {left: 40, top: 70}
  },
  {
    name: 'ARROGANCE',
    color: '#673D91',
    isPopulated: false,
    peripheralId: null,
    position: {left: 0, top: 60}
  },
  {
    name: 'ANGER',
    color: '#88241E',
    isPopulated: false,
    peripheralId: null,
    position: {left: 0, top: 30}
  }
];

export default class RealmHex extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {
  }

  render() {




    return (
      <View style={styles.container}>
        <View style={styles.rowOne}>
          <TouchableOpacity onPress={() => this.props.registerPlayer(realms[0])}>
            <PlayerBox style={styles.one} displayInfo={realms[0]} currentScreen={this.props.currentScreen}/>
          </TouchableOpacity>
        </View>
        <View style={styles.rowTwo}>
          <TouchableOpacity onPress={() => this.props.registerPlayer(realms[1])}>
            <PlayerBox style={styles.two} displayInfo={realms[1]} currentScreen={this.props.currentScreen}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.registerPlayer(realms[2])}>
            <PlayerBox style={styles.three} displayInfo={realms[2]} currentScreen={this.props.currentScreen}/>
          </TouchableOpacity>
        </View>
        <View style={styles.rowThree}>
          <TouchableOpacity onPress={() => this.props.registerPlayer(realms[3])}>
            <PlayerBox style={styles.four} displayInfo={realms[3]} currentScreen={this.props.currentScreen}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.registerPlayer(realms[4])}>
            <PlayerBox style={styles.five} displayInfo={realms[4]} currentScreen={this.props.currentScreen}/>
          </TouchableOpacity>
        </View>
        <View style={styles.rowFour}>
          <TouchableOpacity onPress={() => this.props.registerPlayer(realms[5])}>
            <PlayerBox style={styles.six} displayInfo={realms[5]} currentScreen={this.props.currentScreen}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 250,
    // flex: 1,
    flexDirection: 'column'
  },
  rowOne: {
    flex: .5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowTwo: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rowThree: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rowFour: {
    flex: .5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  one: {
    top: -20
  },
  two: {
    left: 20
  },
  three: {},
  four: {},
  five: {},
  six: {}
  // hexagon: {
  //   width: 75,
  //   height: 41.25,
  //   margin: 20
  // },
  // hexagonInner: {
  //   width: 75,
  //   height: 41.25,
  //   // backgroundColor: this.props.color
  // },
  // hexagonBefore: {
  //   position: 'absolute',
  //   top: -18.75,
  //   left: 0,
  //   width: 0,
  //   height: 0,
  //   borderStyle: 'solid',
  //   borderLeftWidth: 37.5,
  //   borderLeftColor: 'transparent',
  //   borderRightWidth: 37.5,
  //   borderRightColor: 'transparent',
  //   borderBottomWidth: 18.75,
  //   // borderBottomColor: this.props.color
  // },
  // hexagonAfter: {
  //   position: 'absolute',
  //   bottom: -18.50,
  //   left: 0,
  //   width: 0,
  //   height: 0,
  //   borderStyle: 'solid',
  //   borderLeftWidth: 37.5,
  //   borderLeftColor: 'transparent',
  //   borderRightWidth: 37.5,
  //   borderRightColor: 'transparent',
  //   borderTopWidth: 18.75,
  //   // borderTopColor: this.props.color
  // }
});
