import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Pressable} from 'react-native';
import moment from 'moment';
import {withNavigationFocus} from 'react-navigation';
import api from '../../services/api';
import Button from '../../components/Button';
import Datepicker from '../../components/Datepicker';

import {
  Container,
  ExpenseList,
  ExpensesInfo,
  Label,
  Card,
  Left,
  Right,
  CreatedAt,
  Value,
  Kind,
} from './styles';

function Expense({navigation, isFocused}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(8);
  const [date, setDate] = useState(new Date());
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
  }, [isFocused, date]);

  async function loadExpenses() {
    setLoading(true);
    const day = moment(date).format('YYYY-MM-DD');

    const response = await api.get(`expenses?day=${day}`);

    setData(response.data);
    setLoading(false);
  }

  async function loadMoreExpenses() {
    const newPage = page + 1;

    const response = await api.get(
      `expenses?page=${newPage}&per_page=${perPage}`
    );

    if (response.data.length > 0) {
      setPage(newPage);
      setData([...data, ...response.data]);
    }
  }

  function showExpense(expense) {
    navigation.navigate('ShowExpense', {expense});
  }

  return (
    <Container>
      <Datepicker date={date} onChange={setDate} />

      <Button onPress={() => handleNavigate()}> Adicionar despesa </Button>
      <ExpensesInfo>
        <Label> Total: R$ {data.info?.debit} </Label>
        {/* <Label> Total de vendas: {data.info?.quantity} </Label> */}
      </ExpensesInfo>
      {loading ? (
        <ActivityIndicator color="#000" />
      ) : (
        <ExpenseList
          onRefresh={() => loadExpenses()}
          refreshing={loading}
          onEndReachedThreshold={0.2}
          onEndReached={loadMoreExpenses}
          data={data.expenses}
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
