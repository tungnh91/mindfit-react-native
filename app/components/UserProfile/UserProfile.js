import React, {Component} from 'react';
import {AppRegistry, TextInput, Text, View} from 'react-native';
import Auth0Lock from 'react-native-lock';

export default class UserProfile extends React.Component {
  constructor(props) {
    super (props);
  }
  componentDidMount() {
    var appearanceOpts = {
      autoclose: true
    };
    this.props.lock.sms(appearanceOpts, function (error, profile, id_token, access_token, state, refresh_token) {
      if (error) {
        // console.log("Error inside componentDidMount under getProfile", err);
        // TODO: HANDLE ERROR
        return;
      } else {
        this.props.getProfile(profile, id_token);
      }
    }.bind(this));
  }

  render () {
    if (this.props.state.profile) {
      return (
        <View>
          <img className="profilePic" src={this.props.state.profile.picture} />
          <h2 className="profileName">Welcome!</h2>
          <button onClick={this.props.logOut.bind(this)}>Logout</button>
        </View>
      );
    } else {
      return (
        <View>
          <Text> Please login </Text>
          // <Loader />
        </View>
      );
    }
  }
}
