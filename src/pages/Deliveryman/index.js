import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Alert} from 'react-native';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  DeliverymanList,
  Card,
  Button,
  ButtonText,
  Name,
  Actions,
  ActionButton,
} from './styles';

export default function Deliveryman({navigation}) {
  const [loading, setLoading] = useState(false);
  const [deliverymen, setDeliverymen] = useState([]);

  function handleNavigate() {
    navigation.navigate('NewDeliveryman');
  }

  useEffect(() => {
    loadDeliverymen();
  }, []);

  async function loadDeliverymen() {
    setLoading(true);
    const response = await api.get('deliverymen');

    setDeliverymen(response.data);
    setLoading(false);
  }

  function navigateEdit(deliveryman) {
    navigation.navigate('EditDeliveryman', {deliveryman});
  }

  async function handleDelete(deliverymanId) {
    await api.delete(`deliverymen/${deliverymanId}`);

    loadDeliverymen();
  }

  const dialogDelete = (id) => {
    Alert.alert(
      'Tem certeza?',
      'Essa ação não poderá ser desfeita',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => handleDelete(id)},
        ,
      ],
      {cancelable: false},
    );
  };

  return (
    <Container>
      <Button onPress={() => handleNavigate()}>
        <ButtonText> Adicionar entregador </ButtonText>
      </Button>
      {loading ? (
        <ActivityIndicator color="#000" />
      ) : (
        <DeliverymanList
          data={deliverymen}
          keyExtractor={(deliveryman) => String(deliveryman.id)}
          renderItem={({item: deliveryman}) => (
            <Card>
              <Actions>
                <ActionButton onPress={() => dialogDelete(deliveryman.id)}>
                  <Icon name="delete" size={18} color="#000" />
                </ActionButton>
                <ActionButton onPress={() => navigateEdit(deliveryman)}>
                  <Icon name="edit" size={18} color="#000" />
                </ActionButton>
              </Actions>
              <Name>{deliveryman.name}</Name>
            </Card>
          )}
        />
      )}
    </Container>
  );
}

Deliveryman.navigationOptions = {
  title: 'Entregadores',
};
