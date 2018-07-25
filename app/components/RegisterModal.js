import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TextInput,
  TouchableHighlight
} from 'react-native';

export default class RegisterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          visible={this.props.visible}
          onRequestClose={() => null}>
          <View>
            <TextInput
              placeholder="Name"
            />
          </View>
          <TouchableHighlight
            onPress={() => {
              this.props.hide
            }}>
            <Text>x</Text>
          </TouchableHighlight>
        </Modal>
      </View>
    )

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});
