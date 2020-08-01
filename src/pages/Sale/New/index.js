import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import api from '../../services/api';

import {Container, Form, Input, SubmitButton, SubmitButtonText} from './styles';

export default class NewSale extends Component {
  static navigationOptions = {
    title: 'Cadastar venda',
  };

  state = {
    loading: false,
    payment_method: 'cash',
  };

  render() {
    const {loading, payment_method} = this.state;
    const radio_props = [
      {label: 'Cartão de Crédito', value: 'credit_card'},
      {label: 'Dinheiro', value: 'cash'},
    ];

    return (
      <Container>
        <Form>
          <RadioForm
            radio_props={radio_props}
            initial={payment_method}
            formHorizontal={true}
            buttonColor={'#7159c1'}
            animation={true}
            onPress={(value) => {
              this.setState({payment_method: value});
            }}
          />

          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Valor"
            returnKeyType="next"
          />

          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Troco"
            returnKeyType="send"
          />
        </Form>

        <SubmitButton loading={loading} onPress={this.handleAddUser}>
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Icon name="add" size={20} color="#FFF">
              <SubmitButtonText>Criar</SubmitButtonText>
            </Icon>
          )}
        </SubmitButton>
      </Container>
    );
  }
}
