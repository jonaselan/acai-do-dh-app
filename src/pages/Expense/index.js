import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Pressable} from 'react-native';
import api from '../../services/api';
import moment from 'moment';
import {withNavigationFocus} from 'react-navigation';

import {
  Container,
  Button,
  ButtonText,
  ExpenseList,
  Card,
  Left,
  Right,
  CreatedAt,
  Value,
  Kind,
} from './styles';

// TODO: Talvez adc um pull to refresh
function Expense({navigation, isFocused}) {
  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(8);
  const kinds = {
    acai: 'Açai',
    complement: 'Complementos do açai',
    deliveryman: 'Entregadores',
    employees: 'Funcionários',
    others: 'Outros',
  };

  function handleNavigate() {
    navigation.navigate('NewExpense');
  }

  useEffect(() => {
    if (isFocused) {
      loadExpenses();
    }
  }, [isFocused]);

  async function loadExpenses() {
    setLoading(true);
    const response = await api.get('expenses');

    setExpenses(response.data);
    setLoading(false);
  }

  async function loadMoreExpenses() {
    const newPage = page + 1;

    const response = await api.get(
      `expenses?page=${newPage}&per_page=${perPage}`,
    );

    if (response.data.length > 0) {
      setPage(newPage);
      setExpenses([...expenses, ...response.data]);
    }
  }

  function showExpense(expense) {
    navigation.navigate('ShowExpense', {expense});
  }

  return (
    <Container>
      <Button onPress={() => handleNavigate()}>
        <ButtonText> Adicionar despesa </ButtonText>
      </Button>
      {loading ? (
        <ActivityIndicator color="#000" />
      ) : (
        <ExpenseList
          onEndReachedThreshold={0.2}
          onEndReached={loadMoreExpenses}
          data={expenses}
          keyExtractor={(expense) => expense.id}
          renderItem={({item}) => (
            <Pressable onPress={() => showExpense(item)}>
              <Card>
                <Left>
                  <Value>R$ {item.value}</Value>
                  <CreatedAt>
                    {moment(item.created_at).format('DD/MM/YYYY HH:mm:ss')}
                  </CreatedAt>
                </Left>

                <Right>
                  <Kind>{kinds[item.kind]}</Kind>
                </Right>
              </Card>
            </Pressable>
          )}
        />
      )}
    </Container>
  );
}

Expense.navigationOptions = {
  title: 'Despesas',
};

export default withNavigationFocus(Expense);
