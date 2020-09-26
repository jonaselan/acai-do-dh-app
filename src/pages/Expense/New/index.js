import React, {useState} from 'react';
import {ActivityIndicator} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../../services/api';
import toast from '../../../services/toast';

import {
  Container,
  Form,
  Input,
  InputArea,
  SubmitButton,
  SubmitButtonText,
  LabelInput,
} from './styles';

export default function NewExpense({navigation}) {
  const [loading, setLoading] = useState(false);
  const [kind, setKind] = useState(0);
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');

  const kindOptions = [
    {label: 'Açai', value: 0},
    {label: 'Complementos do açai', value: 1},
    {label: 'Entregadores', value: 2},
    {label: 'Funcionários', value: 3},
    {label: 'Outros', value: 4},
  ];
  const kinds = ['acai', 'complement', 'deliveryman', 'employees', 'others'];

  async function handleSubmit() {
    setLoading(true);
    await api.post('expenses', {
      value,
      kind: kinds[kind],
      description,
    });

    setLoading(false);
    toast('Despesa cadastrada com sucesso!');

    navigation.navigate('Expense');
  }

  return (
    <Container>
      <Form>
        <LabelInput>Valor</LabelInput>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Valor"
          keyboardType="numeric"
          returnKeyType="next"
          value={value}
          onChangeText={setValue}
        />
        <LabelInput>Tipo</LabelInput>
        <RadioForm
          radio_props={kindOptions}
          buttonColor={'#7159c1'}
          animation={true}
          onPress={(value) => {
            setKind(value);
          }}
        />
        <LabelInput>Descrição</LabelInput>
        <InputArea
          autoCorrect={false}
          multiline={true}
          numberOfLines={4}
          autoCapitalize="none"
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
        />
      </Form>

      <SubmitButton loading={loading} onPress={handleSubmit}>
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Icon name="add" size={11} color="#FFF">
            <SubmitButtonText>Criar</SubmitButtonText>
          </Icon>
        )}
      </SubmitButton>
    </Container>
  );
}
