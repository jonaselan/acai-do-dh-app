import React, {useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import api from '../../services/api';
// import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  DeliverymanList,
  Card,
  Button,
  ButtonText,
  Name,
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

  function showDeliverymen(expense) {
    navigation.navigate('ShowDeliverymen', {expense});
  }

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
            <Card onPress={() => showDeliverymen()}>
              {/* <Avatar
                source={{
                  uri: deliveryman.avatar
                    ? deliveryman.avatar.url
                    : `https://api.adorable.io/avatar/50/${deliveryman.name}.png`,
                }}
              /> */}
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
