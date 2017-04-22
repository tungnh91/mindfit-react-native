import React, { Component } from 'react';
import App from './src/containers/App';

import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  View
} from 'react-native';
import React, {Component} from 'react';
import {AppRegistry, Text, View} from 'react-native';

import App from './app/components/App'

export default class MindFit extends Component {
  render() {
    return (
      <View style={styles.container}>
        <App />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

AppRegistry.registerComponent('MindFit', () => MindFit);

      <View>
        <App />
      </View>
    )
  }
}

AppRegistry.registerComponent('MindFit', ()=> MindFit)
>>>>>>> Auth0 lock
