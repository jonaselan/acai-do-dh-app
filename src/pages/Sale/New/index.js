import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-community/picker';
// import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  DeliveryMethodView,
  SubmitButton,
  SubmitButtonText,
} from './styles';

export default class NewSale extends Component {
  static navigationOptions = {
    title: 'Cadastar venda',
  };

  state = {
    loading: false,
    payment_method: null,
    delivery_method: 0,
    language: 'java',
  };

  // TODO: carregar entregadores
  // TODO: ao clicar fora do texto, dismiss teclado

  render() {
    const {loading, payment_method, delivery_method} = this.state;
    const payment_methods = [
      {label: 'Dinheiro', value: 0},
      {label: 'Cartão de Crédito', value: 1},
    ];
    const delivery_methods = [
      {label: 'Entregar em casa', value: 0},
      {label: 'Tirar no local', value: 1},
    ];

    return (
      <Container>
        <Form>
          <RadioForm
            radio_props={payment_methods}
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
            keyboardType="numeric"
            returnKeyType="next"
          />

          <Input
            autoCorrect={false}
            autoCapitalize="none"
            defaultValue="0"
            placeholder="Troco"
            keyboardType="numeric"
            returnKeyType="next"
          />

          <RadioForm
            radio_props={delivery_methods}
            initial={delivery_method}
            formHorizontal={true}
            buttonColor={'#7159c1'}
            animation={true}
            onPress={(value) => {
              this.setState({delivery_method: value});
            }}
          />

          {delivery_method ? (
            <DeliveryMethodView />
          ) : (
            <DeliveryMethodView>
              <Picker
                selectedValue={this.state.language}
                style={{height: 50, width: 100}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({language: itemValue})
                }>
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
              </Picker>

              <Input
                autoCorrect={false}
                autoCapitalize="none"
                defaultValue="3"
                keyboardType="numeric"
                placeholder="Valor da entrega"
                returnKeyType="send"
              />
            </DeliveryMethodView>
          )}
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
