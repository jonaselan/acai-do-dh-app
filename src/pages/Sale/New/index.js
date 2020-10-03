import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-community/picker';
import api from '../../../services/api';
import toast from '../../../services/toast';
import Button from '../../../components/Button';

import {Container, Form, Input, SubmitButtonText, LabelInput} from './styles';

export default function NewSale({navigation}) {
  const [loading, setLoading] = useState(false);
  const [charge, setCharge] = useState('0');
  const [value, setValue] = useState('');
  const [deliveryFee, setDeliveryFee] = useState('3');
  const [paymentMethod, setPaymentMethod] = useState(0);
  const [deliveryMethod, setDeliveryMethod] = useState(0);
  const [deliveryman, setDeliveryman] = useState('');

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

    setDeliveryman(response.data[0].id);
    setDeliverymen(response.data);
  }

  async function handleSubmit() {
    setLoading(true);
    await api.post('sales', {
      value: value,
      payment_method: paymentMethod ? 'credit_card' : 'cash',
      delivery_method: deliveryMethod ? 'in_store' : 'delivery',
      charge: charge,
      delivery_fee: deliveryMethod ? 0 : deliveryFee,
      deliveryman_id: deliveryMethod ? null : deliveryman,
    });

    setLoading(false);
    toast('Venda cadastrada com sucesso!');

    navigation.navigate('Sale');
  }

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

        {deliveryMethod ? (
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

      <Button loading={loading} onPress={handleSubmit}>
        <Icon name="add" size={11} color="#FFF">
          <SubmitButtonText>Criar</SubmitButtonText>
        </Icon>
      </Button>
    </Container>
  );
}

NewSale.navigationOptions = {
  title: 'Cadastra venda',
};
