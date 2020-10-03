import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../../services/api';
import toast from '../../../services/toast';
import Button from '../../../components/Button';

import {Container, Form, Input, SubmitButtonText, LabelInput} from './styles';

export default function NewDeliveryman({navigation}) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');

  async function handleSubmit() {
    setLoading(true);
    await api.post('deliverymen', {
      name,
    });

    setLoading(false);
    toast('Entregador criado com sucesso!');

    navigation.navigate('Deliveryman');
  }

  return (
    <Container>
      <Form>
        <LabelInput>Nome</LabelInput>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Nome"
          returnKeyType="next"
          value={name}
          onChangeText={setName}
        />
      </Form>

      <Button loading={loading} onPress={handleSubmit}>
        <Icon name="add" size={11} color="#FFF">
          <SubmitButtonText>Criar</SubmitButtonText>
        </Icon>
      </Button>
    </Container>
  );
}

NewDeliveryman.navigationOptions = {
  title: 'Adicionar entregador',
};
