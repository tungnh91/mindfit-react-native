'use strict;'
import React, {Component} from 'react';
import {AppRegistry, AsyncStorage, Button, TextInput, Text, View} from 'react-native';
import TextEntry from './textEntry/TextEntry';
import Auth0Lock from 'react-native-lock';
import UserProfile from './UserProfile/UserProfile.js'
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idToken: null,
      profile: null,
      phonenumber: '',
    };
    this.getProfile = this.getProfile.bind(this);
    // this.userLog = this.userLog.bind(this);
  }

  componentWillMount() {
    this.createLock();
    this.setState({
      idToken: this.getIdToken()
    });
    this.getProfile();
  }

 async componentDidMount() {
    this.setState({
      phonenumber: await JSON.parse(AsyncStorage.smsCred).phoneNumber.number
    });
  }

  async userLog() {
    let data = {
      phonenumber: this.state.phonenumber
    };
    axios.post('/db/userentry', data)
    .then((user_id) => {
      AsynsStorage.setItem(['user_id', user_id.data]);
    })
    .then((res) => {
      console.log('Userlog sent to server');
    })
    .catch(err => console.log('text upload error...', err));
  }

  createLock() {
    this.lock = new Auth0Lock({clientId: '1zzC2JUKOcJPcIJTrt1vQ6YIC3BkWnhb', domain: 'tungnh91.auth0.com'});
    this.getIdToken();
  }

  async getProfile(profile, id_token) {
    this.setState({
      profile: profile
    });
    await AsyncStorage.setItem(['id_token', id_token]);
  }

  async setToken (item, selectedValue) {
    try {
      await AsyncStorage.setItem([item, selectedValue]);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  async getIdToken() {
    //check if there's a token already
    
    var idToken = await localStorage.getItem('id_token');
    var authHash = this.lock.parseHash(window.location.hash);
    // if theres none in LS but theres one in the URL hash, save it to LS
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token;
        await AsyncStorage.setItem(['id_token', authHash.id_token]);
      }
      if (authHash.error) {
        // TODO: HANDLE ERROR
        // console.log('error from parseHash yo', authHash);
      }
    }
    return idToken;
  }

  async loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = await AsyncStorage.getItem('id_token');
    return !!token;
  }

  async logOut() {
    await AsyncStorage.removeItem('id_token');
    window.location.reload();
  }

  render() {
    this.userLog();
    console.log('this da state',this.state)
    if (this.state.idToken !== 'undefined' && this.loggedIn()) {
      return (
        <View className="container">
          <Text
         style={{padding: 60, color: 'orange', fontSize: 20, fontWeight: 'bold'}} 
          >Welcome!</Text>
         <Button
          onPress={this.logOut}
          title="Log Out"
          color="orange"
        />
        </View>
      );
    } 
    else {
      return (
        <View className="container">
          <UserProfile
            lock={this.lock}
            getIdToken={this.getIdToken}
            logOut={this.logOut}
            state={this.state}
            getProfile={this.getProfile}
            >
          </UserProfile>
        </View>
      ) }
  } 
}








AppRegistry.registerComponent('App', ()=> App);
