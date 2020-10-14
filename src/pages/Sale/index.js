import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Pressable, View, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import {Picker} from '@react-native-community/picker';
import {withNavigationFocus} from 'react-navigation';
import Button from '../../components/Button';

import {
  Container,
  SalesInfo,
  Label,
  Filters,
  CommonButton,
  SaleList,
  Card,
  Left,
  EmptySales,
  Right,
  CreatedAt,
  Value,
  PaymentMethod,
  DeliveryMethod,
  Charge,
} from './styles';

function Sale({navigation, isFocused}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [perPage, setPerPage] = useState(8);

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  function handleNavigate() {
    navigation.navigate('NewSale');
  }

  useEffect(() => {
    if (isFocused) {
      loadSales();
    }
  }, [isFocused, date, paymentMethod]);

  async function loadSales() {
    setLoading(true);
    const day = moment(date).format('YYYY-MM-DD');

    const response = await api.get(`sales?day=${day}&payment_method=${paymentMethod}`);

    setData(response.data);
    setLoading(false);
  }

  async function loadMoreSales() {
    const newPage = page + 1;
    const day = moment(date).format('YYYY-MM-DD');

    const response = await api.get(`sales?page=${newPage}&per_page=${perPage}&day=${day}&payment_method=${paymentMethod}`);

    if (response.data.length > 0) {
      setPage(newPage);
      setData([...data, ...response.data]);
    }
  }

  function showSale(sale) {
    navigation.navigate('ShowSale', {sale});
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setDate(currentDate);
    setShowDatePicker(false);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <Container>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

      <Filters>
        <Left>
          <CommonButton
            onPress={showDatepicker}
            title={moment(date).format('DD-MM-YYYY')}
          />
        </Left>
        <Right>
          <Picker
            selectedValue={paymentMethod}
            style={{height: 50, width: 150}}
            onValueChange={(itemValue) => setPaymentMethod(itemValue)}>
            <Picker.Item label="Nenhum" value="" />
            <Picker.Item label="Dinheiro" value="cash" />
            <Picker.Item label="Cartão de Crédito" value="credit_card" />
          </Picker>
        </Right>
      </Filters>

      <Button onPress={() => handleNavigate()}> Adicionar venda </Button>
      <SalesInfo>
        <Label> Total: R$ {data.info?.credit} ({data.info?.sub_total})</Label>
        <Label> Total de vendas: {data.info?.quantity} </Label>
      </SalesInfo>

      {loading ? (
        <ActivityIndicator color="#000" />
      ) : (
        [
          data.sales?.length ? (
            <SaleList
              onRefresh={() => loadSales()}
              refreshing={loading}
              onEndReachedThreshold={0.2}
              onEndReached={loadMoreSales}
              data={data.sales}
              keyExtractor={(sale) => sale.id}
              renderItem={({item}) => (
                <Pressable onPress={() => showSale(item)}>
                  <Card>
                    <Left>
                      <Value>R$ {item.value}</Value>
                      <CreatedAt>
                        <Icon name="access-time" size={14} color="#333" />
                        {moment(item.created_at).format('DD/MM/YYYY HH:mm:ss')}
                      </CreatedAt>
                    </Left>

                    <Right>
                      {item.delivery_method == 'delivery' ? (
                        <View>
                          <DeliveryMethod>
                            <Icon name="home" size={14} color="#333" />
                            Entrega em casa
                          </DeliveryMethod>
                          <DeliveryMethod>
                            <Icon name="motorcycle" size={14} color="#333" />
                            {item.deliveryman?.name}
                          </DeliveryMethod>
                        </View>
                      ) : (
                        <DeliveryMethod>
                          <Icon name="shop" size={14} color="#333" />
                          Retirada no local
                        </DeliveryMethod>
                      )}

                      {item.payment_method == 'cash' ? (
                        <PaymentMethod>
                          <Icon name="attach-money" size={14} color="#333" />
                          Dinheiro
                        </PaymentMethod>
                      ) : (
                        <PaymentMethod>
                          <Icon name="credit-card" size={14} color="#333" />
                          Cartão de Crédito
                        </PaymentMethod>
                      )}
                      <Charge>
                        <Icon name="arrow-forward" size={14} color="#333" />
                        R$ {item.charge}
                      </Charge>
                    </Right>
                  </Card>
                </Pressable>
              )}
            />
          ) : (
            <EmptySales>
              <Icon name="highlight-off" size={70} color="#333" />
              <Text> Nenhum venda realiza </Text>
            </EmptySales>
          )
        ]
      )}
    </Container>
  );
}

Sale.navigationOptions = {
  title: 'Vendas',
};

export default withNavigationFocus(Sale);
