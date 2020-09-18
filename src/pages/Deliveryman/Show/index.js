import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Alert, View} from 'react-native';
import api from '../../../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import CheckBox from '@react-native-community/checkbox';

import {
  Container,
  SalesInfo,
  Label,
  ButtonIcon,
  ActionButton,
  ActionButtonText,
  SaleList,
  Card,
  Left,
  Right,
  CreatedAt,
  Value,
} from './styles';

export default function ShowDeliveryman({navigation}) {
  const deliveryman = navigation.getParam('deliveryman');
  const [saleIds, setSaleIds] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    loadDeliveryman();
  }, []);

  async function loadDeliveryman() {
    const response = await api.get(`deliverymen/${deliveryman.id}/sales`);
    console.log(response.data);

    setData(response.data);
  }

  function showSale(sale) {
    navigation.navigate('ShowSale', {sale});
  }

  function toggleSale(saleId) {
    let newArray = [];
    if (isSaleToPay(saleId)) {
      newArray = saleIds.filter(function (id) { return id != saleId; });
    } else {
      newArray = saleIds.concat(saleId);
    }

    setSaleIds(newArray);
  }

  function isSaleToPay(saleId) {
    return saleIds.includes(saleId);
  }

  async function handleUpdate() {
    await api.put('sales/bunch_update', {
      ids: saleIds,
    });
  }

  const dialogConfirm = () =>
    Alert.alert(
      'Tem certeza?',
      'Essa ação não poderá ser desfeita',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => handleUpdate()},
        ,
      ],
      {cancelable: false},
    );

  return (
    <Container>
      {data ? (
        <View>
          <SalesInfo>
            <Label>Quanto a pagar: R$ {data.info?.sales_amount} ({data.info?.sales_count})</Label>
          </SalesInfo>

          <SalesInfo>
            <ActionButton onPress={() => dialogConfirm()}>
              <ActionButtonText> Marcar como pago </ActionButtonText>
            </ActionButton>
          </SalesInfo>
          <SaleList
            data={data.sales}
            keyExtractor={(sale) => sale.id}
            renderItem={({item}) => (
              <Card>
                <Left>
                  <Value>R$ {item.value}</Value>
                  <CreatedAt>
                    {moment(item.created_at).format('DD/MM/YYYY HH:mm:ss')}
                  </CreatedAt>
                </Left>

                <Right>
                  <ButtonIcon onPress={() => showSale(item)}>
                    <Icon name="info" size={20} color="#333" />
                  </ButtonIcon>
                  <CheckBox
                    value={isSaleToPay(item.id)}
                    onChange={(newValue) => toggleSale(item.id)}
                  />
                </Right>
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
