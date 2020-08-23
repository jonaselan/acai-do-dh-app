import React, {useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-community/picker';
import api from '../../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  SubmitButtonText,
  LabelInput,
} from './styles';

export default function EditExpense({navigation}) {
  const kindOptions = [
    {label: 'Açai', value: 0},
    {label: 'Complementos do açai', value: 1},
    {label: 'Entregadores', value: 2},
    {label: 'Funcionários', value: 3},
    {label: 'Outros', value: 4},
  ];
  const kinds = {
    acai: 0,
    complement: 1,
    deliveryman: 2,
    employees: 3,
    others: 4,
  };

  const expense = navigation.getParam('expense');
  const [loading, setLoading] = useState(false);
  const [kind, setKind] = useState(kinds[expense.kind]);
  const [value, setValue] = useState(expense.value);

  async function handleSubmit() {
    setLoading(true);
    const invertKinds = Object.assign(
      {},
      ...Object.entries(kinds).map(([a, b]) => ({[b]: a})),
    );
    await api.patch(`expenses/${expense.id}`, {
      value: value,
      kind: invertKinds[kind],
    });

    setLoading(false);

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

        <LabelInput>tipo</LabelInput>
        <RadioForm
          radio_props={kindOptions}
          initial={kind}
          buttonColor={'#7159c1'}
          animation={true}
          onPress={(value) => {
            setKind(value);
          }}
        />
      </Form>

      <SubmitButton loading={loading} onPress={handleSubmit}>
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Icon name="add" size={11} color="#FFF">
            <SubmitButtonText>Editar</SubmitButtonText>
          </Icon>
        )}
      </SubmitButton>
    </Container>
  );
}

EditExpense.navigationOptions = {
  title: 'Editar despesa',
};
