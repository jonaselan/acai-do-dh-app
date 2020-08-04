import React, {useState} from 'react';
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
  LabelInput,
} from './styles';

export default function NewSale() {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [deliveryMethod, setDeliveryMethod] = useState(0);
  const [deliverymen, setDeliverymen] = useState([]);
  const [body, setBody] = useState([]);

  // TODO: carregar entregadores
  // TODO: ao clicar fora do texto, dismiss teclado

  const payment_methods = [
    {label: 'Dinheiro', value: 0},
    {label: 'Cartão de Crédito', value: 1},
  ];
  const delivery_methods = [
    {label: 'Entregar em casa', value: 0},
    {label: 'Tirar no local', value: 1},
  ];

  function handleSubmit() {}

  return (
    <Container>
      <Form>
        <LabelInput>Forma de pagamento</LabelInput>
        <RadioForm
          radio_props={payment_methods}
          formHorizontal={true}
          buttonColor={'#7159c1'}
          animation={true}
          onPress={(value) => {
            setPaymentMethod(value);
          }}
        />

        <LabelInput>Valor</LabelInput>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Valor"
          keyboardType="numeric"
          returnKeyType="next"
        />

        <LabelInput>Troco</LabelInput>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          defaultValue="0"
          placeholder="Troco"
          keyboardType="numeric"
          returnKeyType="next"
        />

        <LabelInput>Forma de entrega</LabelInput>
        <RadioForm
          radio_props={delivery_methods}
          initial={deliveryMethod}
          formHorizontal={true}
          buttonColor={'#7159c1'}
          animation={true}
          onPress={(value) => {
            setDeliveryMethod(value);
          }}
        />

        {deliveryMethod ? (
          <DeliveryMethodView />
        ) : (
          <DeliveryMethodView>
            <LabelInput>Entregador</LabelInput>
            <Picker
              selectedValue={'Java'}
              style={{height: 50, width: 200}}
              onValueChange={(itemValue, itemIndex) =>
                setDeliverymen(itemValue)
              }>
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>

            <LabelInput>Taxa de entrega</LabelInput>
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

      <SubmitButton loading={loading} onPress={handleSubmit}>
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
