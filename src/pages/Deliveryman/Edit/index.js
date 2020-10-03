import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../../services/api';
import toast from '../../../services/toast';
import Button from '../../../components/Button';

import {Container, Form, Input, SubmitButtonText, LabelInput} from './styles';

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
    toast('Entregador editada com sucesso!');

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

      <Button loading={loading} onPress={handleSubmit}>
        <Icon name="edit" size={11} color="#FFF">
          <SubmitButtonText>Editar</SubmitButtonText>
        </Icon>
      </Button>
    </Container>
  );
}

EditDeliveryman.navigationOptions = {
  title: 'Editar entregador',
};
