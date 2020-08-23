import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Alert} from 'react-native';
import api from '../../../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  ExpenseInfos,
  Label,
  Info,
  Actions,
  ActionButton,
  ActionButtonText,
} from './styles';

export default function ShowExpense({navigation}) {
  const expense = navigation.getParam('expense');
  const [data, setData] = useState([]);
  const kinds = {
    acai: 'Açai',
    complement: 'Complementos do açai',
    deliveryman: 'Entregadores',
    employees: 'Funcionários',
    others: 'Outros',
  };

  useEffect(() => {
    loadExpense();
  }, []);

  async function loadExpense() {
    const response = await api.get(`expenses/${expense.id}`);

    setData(response.data);
  }

  function navigateEdit() {
    navigation.navigate('EditExpense', {expense: data});
  }

  async function handleDelete() {
    await api.delete(`expenses/${expense.id}`);

    navigation.navigate('Expense');
  }

  const dialogDelete = () =>
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

  return (
    <Container>
      {data ? (
        <ExpenseInfos>
          <Label>
            Valor: R$ <Info>{data.value}</Info>
          </Label>

          <Label>
            Tipo:
            <Info>{kinds[data.kind]}</Info>
          </Label>
        </ExpenseInfos>
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

ShowExpense.navigationOptions = {
  title: 'Visualizar despesa',
};
