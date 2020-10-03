import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Alert, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import api from '../../services/api';
import toast from '../../services/toast';

import {
  Container,
  DeliverymanList,
  Card,
  Button,
  CommonButton,
  ButtonText,
  SalesInfo,
  Label,
  Name,
  Actions,
  ActionButton,
} from './styles';

export default function Deliveryman({navigation}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  function handleNavigate() {
    navigation.navigate('NewDeliveryman');
  }

  useEffect(() => {
    loadDeliverymen();
  }, [date]);

  async function loadDeliverymen() {
    setLoading(true);
    const day = moment(date).format('YYYY-MM-DD');

    const response = await api.get(`deliverymen/with_filters?day=${day}`);

    setData(response.data);
    setLoading(false);
  }

  function navigateEdit(deliveryman) {
    navigation.navigate('EditDeliveryman', {deliveryman});
  }

  function navigateShow(deliveryman) {
    const day = moment(date).format('YYYY-MM-DD');

    navigation.navigate('ShowDeliveryman', {deliveryman, day});
  }

  async function handleDelete(deliverymanId) {
    await api.delete(`deliverymen/${deliverymanId}`);

    toast('Entregador apagado com sucesso!');
    loadDeliverymen();
  }

  const dialogDelete = (id) => {
    Alert.alert(
      'Tem certeza?',
      'Essa ação não poderá ser desfeita',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => handleDelete(id)},
        ,
      ],
      {cancelable: false},
    );
  };

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
      <View>
        <CommonButton onPress={showDatepicker} title={moment(date).format('DD-MM-YYYY')} />
      </View>

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

      <Button onPress={() => handleNavigate()}>
        <ButtonText> Adicionar entregador </ButtonText>
      </Button>

      <SalesInfo>
        <Label> Total pago: R$ {data.sales_amount_total} </Label>
      </SalesInfo>

      {loading ? (
        <ActivityIndicator color="#000" />
      ) : (
        <DeliverymanList
          onRefresh={() => loadDeliverymen()}
          refreshing={loading}
          data={data.deliverymen}
          keyExtractor={(deliveryman) => String(deliveryman.id)}
          renderItem={({item: deliveryman}) => (
            <Card>
              <Actions>
                <ActionButton onPress={() => navigateShow(deliveryman)}>
                  <Icon name="info" size={20} color="#000" />
                </ActionButton>
                <ActionButton onPress={() => dialogDelete(deliveryman.id)}>
                  <Icon name="delete" size={20} color="#000" />
                </ActionButton>
                <ActionButton onPress={() => navigateEdit(deliveryman)}>
                  <Icon name="edit" size={20} color="#000" />
                </ActionButton>
              </Actions>
              <Name>{deliveryman.name}</Name>
            </Card>
          )}
        />
      )}
    </Container>
  );
}

Deliveryman.navigationOptions = {
  title: 'Entregadores',
};
