import React, {Component} from 'react';
import {Keyboard, ActivityIndicator} from 'react-native';
// import AsyncStore from '@react-native-community/async-storage';
// import api from '../../services/api';
// import Icon from 'react-native-vector-icons/MaterialIcons';

import {Container, Button, ButtonText} from './styles';

export default class Sale extends Component {
  static navigationOptions = {
    title: 'Vendas',
  };

  handleNavigate = () => {
    const {navigation} = this.props;

    navigation.navigate('NewSale');
  };

  render() {
    return (
      <Container>
        <Button onPress={() => this.handleNavigate()}>
          <ButtonText> Adicionar venda </ButtonText>
        </Button>
      </Container>
    );
  }
}
