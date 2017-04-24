'use strict';
import React, {Component} from 'react';
import {AppRegistry, AsyncStorage, Button, TextInput, Text, View, AlertIOS, TouchableHighlight, StyleSheet} from 'react-native';
import TextEntry from './textEntry/TextEntry';
import Auth0Lock from 'react-native-lock';
import UserProfile from './UserProfile/UserProfile.js'
import t from 'tcomb-form-native'


var Form = t.form.Form;

var Person = t.struct({
  phoneNumber: t.String,
  password: t.Str,
  rememberMe: t.Boolean,
});

var options = {
  fields: {
    password: {
      password: true,
      secureTextEntry: true
    }
  }
};

const options = {};
export default class App extends Component {
  async AsyncStorageChange (item, value) {
    try {
      await AsyncStorage.setItem(item, value);
    } catch(error) {
      console.log('error in AsyncStorageChange method yo'+ error.message);
    }
  }

  async loggedIn() {
    let token = await AsyncStorage.getItem('id_token');
    fetch('http://localhost:3000/retrieveEntry', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer' + token
        }
    })
    // .then((response) => //Redirect or Something )
    .done();
  }

  async signUp() {
    let value = this.refs.form.getValue();
    if (value){
      fetch('http://localhost:3000/userentry', {
          method: 'POST',
          headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            phoneNumber: value.phoneNumber,
            password: value.password,
          })
      })
      .then((response) => response.json())
      .then((responseData => {
        this.AsyncStorageChange('id_token', responseData.id_token),
        AlertIOS.alert(
            "Welcome!"
        )
      })
      .done()
      )
    }
  }

  async logIn() {
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
    fetch("http://localhost:3001/userentry", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phoneNumber: value.phoneNumber,
        password: value.password,
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      AlertIOS.alert(
        "Login Success!",
      ),
      this.AsyncStorageChange('id_token', responseData.id_token)
    })
    .done();
    }
  }

  async logOut() {
    try {
      await AsyncStorage.removeItem('id_token')
      AlertIOS.alert('Logout Success!')
    } catch(error) {
      console.log('Error in logout method yo -->', error.message)
    }
  }

  render() {
   return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>MindFit</Text>
          <Text style={styles.title}>🌻</Text>
        </View>
        <View style={styles.row}>
          <Form
            ref="form"
            type={Person}
            options={options}
          />
        </View>
        <View style={styles.row}>
          <TouchableHighlight style={styles.button} onPress={this._userSignup} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={this._userLogin} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}


var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: 'orange',
    borderColor: 'orange',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       idToken: null,
//       profile: null,
//       phonenumber: '',
//     };
//     this.getProfile = this.getProfile.bind(this);
//     // this.userLog = this.userLog.bind(this);
//   }
//
//   componentWillMount() {
//     this.createLock();
//     this.setState({
//       idToken: this.getIdToken()
//     });
//     this.getProfile();
//   }
//
//  async componentDidMount() {
//     this.setState({
//       phonenumber: await JSON.parse(AsyncStorage.smsCred).phoneNumber.number
//     });
//   }
//
//   async userLog() {
//     let data = {
//       phonenumber: this.state.phonenumber
//     };
//     axios.post('/db/userentry', data)
//     .then((user_id) => {
//       AsynsStorage.setItem(['user_id', user_id.data]);
//     })
//     .then((res) => {
//       console.log('Userlog sent to server');
//     })
//     .catch(err => console.log('text upload error...', err));
//   }
//
//   createLock() {
//     this.lock = new Auth0Lock({clientId: '1zzC2JUKOcJPcIJTrt1vQ6YIC3BkWnhb', domain: 'tungnh91.auth0.com'});
//     this.getIdToken();
//   }
//
//   async getProfile(profile, id_token) {
//     this.setState({
//       profile: profile
//     });
//     await AsyncStorage.setItem(['id_token', id_token]);
//   }
//
//   async setToken (item, selectedValue) {
//     try {
//       await AsyncStorage.setItem([item, selectedValue]);
//     } catch (error) {
//       console.log('AsyncStorage error: ' + error.message);
//     }
//   }
//
//   async getIdToken() {
//     //check if there's a token already
//    var token; 
//    await localStorage.getItem('id_token', (err, result) => {
//      if (err){
//        console.log(err)
//      }
//    });
//     var authHash = this.lock.parseHash(window.location.hash);
//     // if theres none in LS but theres one in the URL hash, save it to LS
  //   if (!idToken && authHash) {
  //     if (authHash.id_token) {
  //       idToken = authHash.id_token;
  //       await AsyncStorage.setItem(['id_token', authHash.id_token]);
  //     }
  //     if (authHash.error) {
  //       // TODO: HANDLE ERROR
  //       // console.log('error from parseHash yo', authHash);
  //     }
  //   }
  //   return idToken;
  // }
  //
//   async loggedIn() {
//     // Checks if there is a saved token and it's still valid
//     const token = await AsyncStorage.getItem('id_token');
//     return !!token;
//   }
//
//   async logOut() {
//     await AsyncStorage.removeItem('id_token');
//     window.location.reload();
//   }
//
//   render() {
//     this.userLog();
//     console.log('this da state',this.state)
//     if (this.state.idToken !== 'undefined' && this.loggedIn()) {
//       return (
//         <View className="container">
//           <Text
//          style={{padding: 60, color: 'orange', fontSize: 20, fontWeight: 'bold'}} 
//           >Welcome!</Text>
//          <Button
//           onPress={this.logOut}
//           title="Log Out"
//           color="orange"
//         />
//         </View>
//       );
//     } 
//     else {
//       return (
//         <View className="container">
//           <UserProfile
//             lock={this.lock}
//             getIdToken={this.getIdToken}
//             logOut={this.logOut}
//             state={this.state}
//             getProfile={this.getProfile}
//             >
//           </UserProfile>
//         </View>
//       ) }
//   } 
// }
//
//






AppRegistry.registerComponent('App', ()=> App);
