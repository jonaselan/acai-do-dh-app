import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Pressable} from 'react-native';
// import AsyncStore from '@react-native-community/async-storage';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import {withNavigationFocus} from 'react-navigation';

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

// TODO: Talvez adc um pull to refresh
function Sale({navigation, isFocused}) {
  const [loading, setLoading] = useState(false);
  const [sales, setSales] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(8);

  function handleNavigate() {
    navigation.navigate('NewSale');
  }

  useEffect(() => {
    if (isFocused) {
      loadSales();
    }
  }, [isFocused]);

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

  function showSale(sale) {
    navigation.navigate('ShowSale', {sale});
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
            <Pressable onPress={() => showSale(item)}>
              <Card>
                <Left>
                  <Value>R$ {item.value}</Value>
                  <CreatedAt>
                    {moment(item.created_at).format('DD/MM/YYYY hh:mm:ss')}
                  </CreatedAt>
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
                    R$ {item.charge}
                  </Charge>
                </Right>
              </Card>
            </Pressable>
          )}
        />
      )}
    </Container>
  );
}

Sale.navigationOptions = {
  title: 'Vendas',
};

export default withNavigationFocus(Sale);
