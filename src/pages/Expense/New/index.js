import React, {useState} from 'react';
import RadioForm from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Datepicker from '../../../components/Datepicker';
import api from '../../../services/api';
import toast from '../../../services/toast';
import Button from '../../../components/Button';
import moment from 'moment';

import {
  Container,
  Form,
  Input,
  InputArea,
  SubmitButtonText,
  LabelInput,
} from './styles';

export default function NewExpense({navigation}) {
  const [loading, setLoading] = useState(false);
  const [kind, setKind] = useState(0);
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [createdAt, setcreatedAt] = useState(new Date());

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
      created_at: moment(createdAt).add(3, 'hours').format('YYYY-MM-DD HH:mm:ss'),
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
        <Icon name="add" size={11} color="#FFF">
          <SubmitButtonText>Criar</SubmitButtonText>
        </Icon>
      </Button>
    </Container>
  );
}