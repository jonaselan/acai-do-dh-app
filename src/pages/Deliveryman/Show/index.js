import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Alert, View} from 'react-native';
import api from '../../../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

import {
  Container,
  SalesInfo,
  Label,
  ActionButton,
  SaleList,
  Card,
  Left,
  Right,
  CreatedAt,
  Value,
} from './styles';

export default function ShowDeliveryman({navigation}) {
  const deliveryman = navigation.getParam('deliveryman');
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

  // sales: sales,
  // info: {
  //   sales_count: sales.size,
  //   sales_amount: sales.where(paid: false).sum(:delivery_fee)
  // }

  // {data.info.sales_amount} ({data.info.sales_count})

  return (
    <Container>
      {data ? (
        <View>
          <SalesInfo>
            <Label>Quanto a pagar: R$ {data.info.sales_amount} ({data.info.sales_count})</Label>
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
                  <ActionButton onPress={() => showSale(item)}>
                    <Icon name="info" size={20} color="#333" />
                  </ActionButton>
                  <ActionButton>
                    <Icon name="check" size={20} color="#333" />
                  </ActionButton>
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
  title: 'deliverymanName',
};
