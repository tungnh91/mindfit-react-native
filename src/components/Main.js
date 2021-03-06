import React, { Component } from 'react';
import TextEntry from './TextEntry.js';
import EntryList from './EntryList.js';
import Auth0Lock from 'react-native-lock';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Main extends Component {

  render() {
    return (
      <View>
        <EntryList />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  font: {
    fontSize: 14,
    color: 'black',
  }
});

