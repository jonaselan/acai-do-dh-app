import React, {useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import api from '../../../services/api';

import {Container, SaleInfos, Label, Info, DeliveryMethodView} from './styles';

export default function ShowSale({navigation}) {
  const sale = navigation.getParam('sale');
  const [data, setData] = useState([]);

  useEffect(() => {
    loadSale();
  }, []);

  async function loadSale() {
    const response = await api.get(`sales/${sale.id}`);

    setData(response.data);
  }

  return (
    <Container>
      {data ? (
        <SaleInfos>
          <Label>
            Valor: R$ <Info>{data.value}</Info>
          </Label>

          <Label>
            Forma de pagamento:{' '}
            <Info>
              {data.payment_method == 'cash'
                ? ' Dinheiro'
                : ' Cartão de Crédito'}
            </Info>
          </Label>

          <Label>
            Troco: R$ <Info>{data.charge}</Info>
          </Label>

          <Label>
            Forma de entrega:
            <Info>
              {data.delivery_method == 'delivery'
                ? ' Entrega em casa'
                : ' Retirada na Loja'}
            </Info>
          </Label>

          {data.delivery_method == 'delivery' ? (
            <DeliveryMethodView>
              <Label>
                Entregador: <Info>{data.deliveryman.name}</Info>
              </Label>

              <Label>
                Taxa de entrega: R$ <Info>{data.delivery_fee}</Info>
              </Label>
            </DeliveryMethodView>
          ) : (
            <DeliveryMethodView />
          )}
        </SaleInfos>
      ) : (
        <ActivityIndicator color="#000" />
      )}
    </Container>
  );
}

ShowSale.navigationOptions = {
  title: 'Visualizar venda',
};
