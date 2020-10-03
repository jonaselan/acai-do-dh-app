import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Alert, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import CheckBox from '@react-native-community/checkbox';
import api from '../../../services/api';
import Button from '../../../components/Button';

import {
  Container,
  SalesInfo,
  Label,
  ButtonIcon,
  SaleList,
  Card,
  Left,
  Right,
  CreatedAt,
  Value,
  Charge,
  DeliveryFee,
} from './styles';

export default function ShowDeliveryman({navigation}) {
  const deliveryman = navigation.getParam('deliveryman');
  const day = navigation.getParam('day');
  const [saleIds, setSaleIds] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    loadDeliveryman();
  }, [data]);

  async function loadDeliveryman() {
    const response = await api.get(
      `deliverymen/${deliveryman.id}/sales?day=${day}`,
    );

    setData(response.data);
  }

  function showSale(sale) {
    navigation.navigate('ShowSale', {sale});
  }

  function toggleSale(saleId) {
    let newArray = [];
    if (isSaleToPay(saleId)) {
      newArray = saleIds.filter(function (id) {
        return id != saleId;
      });
    } else {
      newArray = saleIds.concat(saleId);
    }

    setSaleIds(newArray);
  }

  function isSaleToPay(saleId) {
    return saleIds.includes(saleId);
  }

  async function handleBunchUpdate() {
    await api.put('sales/bunch_update', {
      ids: saleIds,
    });
  }

  async function handleUpdateReceiver(saleId) {
    await api.put(`sales/${saleId}`, {
      receiver: true,
    });
  }

  const dialogConfirmBunchUpdate = () =>
    Alert.alert(
      'Tem certeza?',
      'Essa ação não poderá ser desfeita',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => handleBunchUpdate()},
        ,
      ],
      {cancelable: false},
    );

  return (
    <Container>
      {data ? (
        <View>
          <SalesInfo>
            <Label>
              Quanto a pagar: R$ {data.info?.sales_amount} (
              {data.info?.sales_count})
            </Label>
          </SalesInfo>

          <SalesInfo>
            <Label> Total: R$ {data.info?.sales_amount_total} </Label>
            <Label> Total de vendas: {data.info?.sales_count_total} </Label>
          </SalesInfo>

          <SalesInfo>
            <Button onPress={() => dialogConfirmBunchUpdate()}>
              Marcar selecionado(s) como pago
            </Button>
          </SalesInfo>
          <SaleList
            data={data.sales}
            keyExtractor={(sale) => sale.id}
            renderItem={({item}) => (
              <Card>
                <Left>
                  <Value>R$ {item.value}</Value>
                  <Charge> Troco: R$ {item.charge} </Charge>
                  <DeliveryFee>
                    Taxa entrega: R$ {item.delivery_fee}
                  </DeliveryFee>
                  <CreatedAt>
                    {moment(item.created_at).format('DD/MM/YYYY HH:mm:ss')}
                  </CreatedAt>
                </Left>

                <Right>
                  <ButtonIcon onPress={() => showSale(item)}>
                    <Icon name="info" size={20} color="#333" />
                  </ButtonIcon>
                  <Button
                    disabled={item.receiver}
                    onPress={() => handleUpdateReceiver(item.id)}>
                    Recebi
                  </Button>
                </Right>
                <CheckBox
                  disabled={item.paid}
                  value={isSaleToPay(item.id)}
                  onChange={(newValue) => toggleSale(item.id)}
                />
              </Card>
            )}
          />
        </View>
      ) : (
        <ActivityIndicator color="#000" />
      )}
    </Container>
  );
}

ShowDeliveryman.navigationOptions = {
  title: 'Entregas',
};
