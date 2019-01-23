import { View, Text, NetInfo, Platform, StatusBar, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { Constants } from 'expo';

export default class Status extends Component {
  state = {
    info: null,
  };

  render() {
    const { info } = this.state;

    const isConnected = info !== 'none';
    const backgroundColor = isConnected ? 'white' : 'red';

    const statusBar = (
      <StatusBar
      backgroundColor={backgroundColor}
      barStyle={isConnected ? 'dark-content' : 'light-content'}
      animated={false}
      />
    );

    if (Platform.OS === 'ios') {
      return <View style={[styles.status, { backgroundColor }]}></View>;
    }

    return null; // Temporary

    // return (
    //   <div></div>
    // );
  }
}

const statusHeight = Platform.OS === 'ios' ? Constants.statusBarHeight : 0;

const styles = StyleSheet.create({
  status: {
    zIndex: 1,
    height: statusHeight,
  },
});
