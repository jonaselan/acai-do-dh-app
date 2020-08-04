import React from 'react';
// import {Keyboard, ActivityIndicator} from 'react-native';
// import AsyncStore from '@react-native-community/async-storage';
// import api from '../../services/api';
// import Icon from 'react-native-vector-icons/MaterialIcons';

import {Container, Button, ButtonText} from './styles';

export default function Sale({navigation}) {
  function handleNavigate() {
    // const {navigation} = this.props;

    navigation.navigate('NewSale');
  }

  return (
    <Container>
      <Button onPress={() => handleNavigate()}>
        <ButtonText> Adicionar venda </ButtonText>
      </Button>
    </Container>
  );
}

Sale.navigationOptions = {
  title: 'Vendas',
};
