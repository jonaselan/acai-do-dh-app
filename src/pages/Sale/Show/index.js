import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Alert, View} from 'react-native';
import api from '../../../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  SaleInfos,
  Label,
  Info,
  Actions,
  ActionButton,
  ActionButtonText,
} from './styles';

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

  function navigateEdit() {
    navigation.navigate('EditSale', {sale: data});
  }

  async function handleDelete() {
    await api.delete(`sales/${sale.id}`);

    navigation.navigate('Sale');
  }

  const dialogDelete = () => {
    Alert.alert(
      'Tem certeza?',
      'Essa ação não poderá ser desfeita',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => handleDelete()},
        ,
      ],
      {cancelable: false},
    );
  };

  return (
    <Container>
      {data ? (
        <SaleInfos>
          <Label>
            Valor: R$ <Info>{data.value}</Info>
          </Label>

          <Label>
            Forma de pagamento:
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
                : ' Retirada no local'}
            </Info>
          </Label>

          {data.delivery_method == 'delivery' ? (
            <View>
              <Label>
                Entregador: <Info>{data.deliveryman.name}</Info>
              </Label>

              <Label>
                Taxa de entrega: R$ <Info>{data.delivery_fee}</Info>
              </Label>
            </View>
          ) : (
            <View />
          )}
        </SaleInfos>
      ) : (
        <ActivityIndicator color="#000" />
      )}

      <Actions>
        <ActionButton onPress={() => dialogDelete()}>
          <Icon name="delete" size={11} color="#FFF">
            <ActionButtonText> Apagar </ActionButtonText>
          </Icon>
        </ActionButton>
        <ActionButton onPress={() => navigateEdit()}>
          <Icon name="edit" size={11} color="#FFF">
            <ActionButtonText> Editar </ActionButtonText>
          </Icon>
        </ActionButton>
      </Actions>
    </Container>
  );
}

ShowSale.navigationOptions = {
  title: 'Visualizar venda',
};
