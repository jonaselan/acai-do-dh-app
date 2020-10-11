import React, {useState} from 'react';
import RadioForm from 'react-native-simple-radio-button';
import Datepicker from '../../../components/Datepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../../services/api';
import toast from '../../../services/toast';
import Button from '../../../components/Button';
import moment from 'moment';

import {
  Container,
  Form,
  Input,
  SubmitButtonText,
  LabelInput,
  InputArea,
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
  const [description, setDescription] = useState(expense.description);
  const [createdAt, setcreatedAt] = useState(new Date(expense.created_at));

  async function handleSubmit() {
    setLoading(true);
    const invertKinds = Object.assign(
      {},
      ...Object.entries(kinds).map(([a, b]) => ({[b]: a})),
    );
    await api.patch(`expenses/${expense.id}`, {
      value: value,
      kind: invertKinds[kind],
      description,
      created_at: moment(createdAt)
        .add(3, 'hours')
        .format('YYYY-MM-DD HH:mm:ss'),
    });

    setLoading(false);
    toast('Despesa editada com sucesso!');

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
          initial={kind}
          buttonColor={'#7159c1'}
          animation={true}
          onPress={(value) => {
            setKind(value);
          }}
        />

        <LabelInput>Data</LabelInput>
        <Datepicker date={createdAt} onChange={setcreatedAt} />

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

      <Button loading={loading} onPress={handleSubmit}>
        <Icon name="edit" size={11} color="#FFF">
          <SubmitButtonText>Editar</SubmitButtonText>
        </Icon>
      </Button>
    </Container>
  );
}

EditExpense.navigationOptions = {
  title: 'Editar despesa',
};
