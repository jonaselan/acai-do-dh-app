import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-community/picker';
import api from '../../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  SubmitButtonText,
  LabelInput,
} from './styles';

export default function EditSale({navigation}) {
  const sale = navigation.getParam('sale');
  const [loading, setLoading] = useState(false);
  const [charge, setCharge] = useState(sale.charge);
  const [value, setValue] = useState(sale.value);
  const [deliveryFee, setDeliveryFee] = useState(sale.delivery_fee);
  const [deliveryman, setDeliveryman] = useState(sale.deliveryman_id);
  const [paymentMethod, setPaymentMethod] = useState(
    sale.payment_method == 'cash' ? 0 : 1,
  );
  const [deliveryMethod, setDeliveryMethod] = useState(
    sale.delivery_method == 'delivery' ? 0 : 1,
  );
  const [deliverymen, setDeliverymen] = useState(null);

  const payment_methods = [
    {label: 'Dinheiro', value: 0},
    {label: 'Cartão de Crédito', value: 1},
  ];
  const delivery_methods = [
    {label: 'Entregar em casa', value: 0},
    {label: 'Tirar no local', value: 1},
  ];

  useEffect(() => {
    loadDeliverymen();
  }, []);

  async function loadDeliverymen() {
    const response = await api.get('deliverymen');

    setDeliverymen(response.data);
  }

  async function handleSubmit() {
    setLoading(true);
    await api.patch(`sales/${sale.id}`, {
      value: value,
      payment_method: paymentMethod ? 'credit_card' : 'cash',
      delivery_method: deliveryMethod ? 'in_store' : 'delivery',
      charge: charge,
      delivery_fee: deliveryMethod ? 0 : deliveryFee,
      deliveryman_id: deliveryMethod ? null : deliveryman,
    });

    setLoading(false);

    navigation.navigate('Sale');
  }

  return (
    <Container>
      <Form>
        <LabelInput>Forma de pagamento</LabelInput>
        <RadioForm
          radio_props={payment_methods}
          initial={paymentMethod}
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
          value={value}
          onChangeText={setValue}
        />

        <LabelInput>Troco</LabelInput>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          defaultValue="0"
          placeholder="Troco"
          keyboardType="numeric"
          returnKeyType="next"
          value={charge}
          onChangeText={setCharge}
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

        {sale.delivery_method == 'in_store' ? (
          <View />
        ) : (
          <View>
            <LabelInput>Entregador</LabelInput>
            {deliverymen ? (
              <Picker
                selectedValue={deliveryman}
                style={{height: 50, width: 300}}
                onValueChange={(itemValue) => setDeliveryman(itemValue)}>
                {deliverymen.map((deliverym, i) => {
                  return (
                    <Picker.Item
                      key={i}
                      label={deliverym.name}
                      value={deliverym.id}
                    />
                  );
                })}
              </Picker>
            ) : (
              <ActivityIndicator color="#000" />
            )}

            <LabelInput>Taxa de entrega</LabelInput>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="numeric"
              placeholder="Valor da entrega"
              returnKeyType="send"
              value={deliveryFee}
              onChangeText={setDeliveryFee}
            />
          </View>
        )}
      </Form>

      <SubmitButton loading={loading} onPress={handleSubmit}>
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Icon name="edit" size={11} color="#FFF">
            <SubmitButtonText>Editar</SubmitButtonText>
          </Icon>
        )}
      </SubmitButton>
    </Container>
  );
}

EditSale.navigationOptions = {
  title: 'Editar venda',
};
