
import React, {Component} from 'react';
import {Platform, StyleSheet, View, Button, TouchableOpacity} from 'react-native';
import PlayerBox from './PlayerBox';

export default class RealmHex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      realms: this.props.realms
    };
  }

  componentDidMount() {
  }

  claimRealm(realm) {
    this.props.registerPlayer(realm);
    // let realmsArray = this.state.realms;
    // let updateIndex = realmsArray.indexOf(realm);
    // realmsArray[updateIndex].isClaimed = true;
    // this.setState({realms: realmsArray});
  }

  render() {




    return (
      <View style={styles.container}>
        <View style={styles.rowOne}>
          <TouchableOpacity onPress={() => this.claimRealm(this.state.realms[0])}>
            <PlayerBox style={styles.one} displayInfo={this.state.realms[0]}/>
          </TouchableOpacity>
        </View>
        <View style={styles.rowTwo}>
          <TouchableOpacity onPress={() => this.claimRealm(this.state.realms[1])}>
            <PlayerBox style={styles.two} displayInfo={this.state.realms[1]}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.claimRealm(this.state.realms[2])}>
            <PlayerBox style={styles.three} displayInfo={this.state.realms[2]}/>
          </TouchableOpacity>
        </View>
        <View style={styles.rowThree}>
          <TouchableOpacity onPress={() => this.claimRealm(this.state.realms[3])}>
            <PlayerBox style={styles.four} displayInfo={this.state.realms[3]}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.claimRealm(this.state.realms[4])}>
            <PlayerBox style={styles.five} displayInfo={this.state.realms[4]}/>
          </TouchableOpacity>
        </View>
        <View style={styles.rowFour}>
          <TouchableOpacity onPress={() => this.claimRealm(this.state.realms[5])}>
            <PlayerBox style={styles.six} displayInfo={this.state.realms[5]}/>
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowTwo: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center'
  },
  rowThree: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center'
  },
  rowFour: {
    flex: 1,
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
