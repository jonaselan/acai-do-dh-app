import React, {useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
// import AsyncStore from '@react-native-community/async-storage';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Button,
  ButtonText,
  SaleList,
  Card,
  Left,
  Right,
  CreatedAt,
  Value,
  PaymentMethod,
  DeliveryMethod,
  Charge,
} from './styles';

export default function Sale({navigation}) {
  const [loading, setLoading] = useState(false);
  const [sales, setSales] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(8);

  function handleNavigate() {
    navigation.navigate('NewSale');
  }

  useEffect(() => {
    loadSales();
  }, []);

  async function loadSales() {
    setLoading(true);
    const response = await api.get('sales');

    setSales(response.data);
    setLoading(false);
  }

  async function loadMoreSales() {
    const newPage = page + 1;

    const response = await api.get(`sales?page=${newPage}&per_page=${perPage}`);

    if (response.data.length > 0) {
      setPage(newPage);
      setSales([...sales, ...response.data]);
    }
  }

  return (
    <Container>
      <Button onPress={() => handleNavigate()}>
        <ButtonText> Adicionar venda </ButtonText>
      </Button>
      {loading ? (
        <ActivityIndicator color="#000" />
      ) : (
        <SaleList
          onEndReachedThreshold={0.2}
          onEndReached={loadMoreSales}
          data={sales}
          keyExtractor={(sale) => sale.id}
          renderItem={({item}) => (
            <Card>
              <Left>
                <Value>R$ {item.value}</Value>
                <CreatedAt>20/07/2000</CreatedAt>
              </Left>

              <Right>
                {item.delivery_method == 'delivery' ? (
                  <DeliveryMethod>
                    <Icon name="home" size={14} color="#333" />
                    Entrega em casa
                  </DeliveryMethod>
                ) : (
                  <DeliveryMethod>
                    <Icon name="shop" size={14} color="#333" />
                    Retirada no local
                  </DeliveryMethod>
                )}

                {item.payment_method == 'cash' ? (
                  <PaymentMethod>
                    <Icon name="attach-money" size={14} color="#333" />
                    Dinheiro
                  </PaymentMethod>
                ) : (
                  <PaymentMethod>
                    <Icon name="credit-card" size={14} color="#333" />
                    Cartão de Crédito
                  </PaymentMethod>
                )}
                <Charge>
                  <Icon name="arrow-back" size={14} color="#333" />
                  {item.charge}
                </Charge>
              </Right>
            </Card>
          )}
        />
      )}
    </Container>
  );
}

Sale.navigationOptions = {
  title: 'Vendas',
};
