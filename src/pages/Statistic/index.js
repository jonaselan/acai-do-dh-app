import React, {useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
// import {PieChart} from 'react-native-chart-kit';
import api from '../../services/api';
import {Picker} from '@react-native-community/picker';
import {withNavigationFocus} from 'react-navigation';

import {
  Container,
  Filters,
  Left,
  Right,
  Infos,
  Label,
  Header,
  Value,
} from './styles';

function Statistic() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, [month, year]);

  async function loadData() {
    setLoading(true);
    const date = `${year}-${month}`;

    const response = await api.get(`statistics?date=${date}`);

    setData(response.data);
    setLoading(false);
  }

  return (
    <Container>
      <Filters>
        <Left>
          <Picker
            selectedValue={month}
            style={{height: 50, width: 150}}
            onValueChange={(itemValue) => setMonth(itemValue)}>
            <Picker.Item label="Janeiro" value={1} />
            <Picker.Item label="Fevereiro" value={2} />
            <Picker.Item label="Março" value={3} />
            <Picker.Item label="Abril" value={4} />
            <Picker.Item label="Maio" value={5} />
            <Picker.Item label="Junho" value={6} />
            <Picker.Item label="Julho" value={7} />
            <Picker.Item label="Agosto" value={8} />
            <Picker.Item label="Setembro" value={9} />
            <Picker.Item label="Outubro" value={10} />
            <Picker.Item label="Novembro" value={11} />
            <Picker.Item label="Dezembro" value={12} />
          </Picker>
        </Left>
        <Right>
          <Picker
            selectedValue={year}
            style={{height: 50, width: 150}}
            onValueChange={(itemValue) => setYear(itemValue)}>
            <Picker.Item label="2020" value={2020} />
            <Picker.Item label="2021" value={2021} />
          </Picker>
        </Right>
      </Filters>

      {loading ? (
        <ActivityIndicator color="#000" />
      ) : (
        <Infos>
          <Header> Vendas </Header>
          <Label> Dinheiro: R$ {data.sales?.cash} </Label>
          <Label> Cartão de Crédito: R$ {data.sales?.credit_card} </Label>
          <Label> Total: R$ {data.sales?.total} </Label>

          <Header> Despesas </Header>

          <Label> Entregas: R$ {data.expenses?.deliveries_fee} </Label>
          <Label> Açai: R$ {data.expenses?.acai} </Label>
          <Label> Complementos: R$ {data.expenses?.complement} </Label>
          <Label> Entregadores: R$ {data.expenses?.employees} </Label>
          <Label> Funcionários: R$ {data.expenses?.deliveryman} </Label>
          <Label> Outros: R$ {data.expenses?.others} </Label>
          <Label> Total: R$ {data.expenses?.total} </Label>
        </Infos>
      )}
    </Container>
  );
}

Statistic.navigationOptions = {
  title: 'Estatisticas',
};

export default withNavigationFocus(Statistic);
