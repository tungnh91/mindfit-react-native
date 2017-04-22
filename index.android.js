import React, {Component} from 'react';
import {AppRegistry, Text, View} from 'react-native';

import App from './app/components/App'

export default class MindFit extends Component {
  render() {
    return (
      <View>
        <App />
      </View>
    )
  }
}

AppRegistry.registerComponent('MindFit', ()=> MindFit)
