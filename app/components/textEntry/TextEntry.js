import React from 'react';
import axios from 'axios';
import {AppRegistry, TextInput, Text, View} from 'react-native';

export default class TextEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      text: this.state.value,
      entryType: 'text',
      user_id: localStorage.user_id
    };

    axios.post('/entry', data)
    .then(res => console.log('text upload to server done'))
    .catch(err => console.log('text upload error...', err));

    this.setState({value: ''});
  }

  render() {
    return (
      <View>
        <TextInput
        />
      </View>
    );
  }
}

