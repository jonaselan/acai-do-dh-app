import React, {Component} from 'react';
import {Keyboard, ActivityIndicator} from 'react-native';
// import AsyncStore from '@react-native-community/async-storage';
// import api from '../../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Container, Text} from './styles';

export default class Expense extends Component {
  static navigationOptions = {
    title: 'Despesas',
  };

  render() {
    return <Container />;
  }
}
