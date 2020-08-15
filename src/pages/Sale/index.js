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
} from './styles';

export default function Sale({navigation}) {
  const [loading, setLoading] = useState(false);
  const [sales, setSales] = useState([]);

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

  return (
    <Container>
      <Button onPress={() => handleNavigate()}>
        <ButtonText> Adicionar venda </ButtonText>
      </Button>
      {loading ? (
        <ActivityIndicator color="#000" />
      ) : (
        <SaleList
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
                    <Icon name="home" size={15} color="#333" />
                    Entrega em casa
                  </DeliveryMethod>
                ) : (
                  <DeliveryMethod>
                    <Icon name="shop" size={15} color="#333" />
                    Retirada no local
                  </DeliveryMethod>
                )}

                {item.payment_method == 'cash' ? (
                  <PaymentMethod>
                    <Icon name="attach-money" size={15} color="#333" />
                    Dinheiro
                  </PaymentMethod>
                ) : (
                  <PaymentMethod>
                    <Icon name="credit-card" size={15} color="#333" />
                    Cartão de Crédito
                  </PaymentMethod>
                )}
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
