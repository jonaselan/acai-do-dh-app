import React, {useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  SubmitButtonText,
  LabelInput,
} from './styles';

export default function EditDeliveryman({navigation}) {
  const deliveryman = navigation.getParam('deliveryman');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(deliveryman.name);

  async function handleSubmit() {
    setLoading(true);
    await api.patch(`deliverymen/${deliveryman.id}`, {
      name,
    });

    setLoading(false);

    navigation.navigate('Deliveryman');
  }

  return (
    <Container>
      <Form>
        <LabelInput>Name</LabelInput>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Name"
          returnKeyType="next"
          value={name}
          onChangeText={setName}
        />
      </Form>

      <SubmitButton loading={loading} onPress={handleSubmit}>
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Icon name="edit" size={11} color="#FFF">
            <SubmitButtonText>Editar</SubmitButtonText>
          </Icon>
        )}
      </SubmitButton>
    </Container>
  );
}

EditDeliveryman.navigationOptions = {
  title: 'Editar entregador',
};
